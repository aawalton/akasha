"use client"

import { UserIdContext } from "@akasha/pages-ui/use-user-id"
import {
  mintDeviceSecretResponseSchema,
  mintDeviceSecretSchema,
  revokeDeviceSecretSchema,
} from "@akasha/person-system/device-secret-body"
import {
  decideMintAction,
  decideRecoveryAction,
  domainSaid,
  type PeekProbe,
  type RouteRead,
  recoveryMarkRead,
  routeRead,
} from "@akasha/person-system/device-secret-minting"
import { useContext, useEffect, useRef } from "react"
import { apiFetch } from "../api-fetch/api-fetch.module.code.ts"
import {
  type DeviceSecretPlugin,
  getDeviceSecret,
  isNativeShell,
} from "../capacitor-bridge/capacitor-bridge.module.code.ts"

// `domain` is carried through rather than dropped, because WHERE the item sits decides
// whether the widget extension can ever read it — an item in the app's default domain
// satisfies this probe while the extension's read of it is refused.
//
// A shell that answers with no `domain` at all reads as `unsaid`, and `unsaid` re-mints.
// That case is unreachable in anything shipped rather than merely unlikely: the shipped
// build 198 (mainSha 04959e93f4) resolves `domain` in its `peek`, and the web assets ride
// in the same archive as the native code (`webDir: "www"`, no `server.url`, CSP
// `script-src 'self'`), so this file never meets a shell older than itself. The mapping is
// written down anyway so the answer to a missing field is a decision and not an accident.
async function probeKeychain(plugin: DeviceSecretPlugin, userId: string): Promise<PeekProbe> {
  try {
    const result = await plugin.peek({ userId })
    return { ok: true, present: result.present, domain: domainSaid(result.domain) }
  } catch (error: unknown) {
    console.error("[device-secret] Keychain probe failed; treating as absent", error)
    return { ok: false }
  }
}

// Where the last recovery is remembered. Not a credential — a millisecond timestamp — so
// localStorage is the right home for it and the keychain is not. Keyed per account so one
// person's rotation does not spend another's budget on a shared device.
const RECOVERY_MARK = "device-secret-recovered-at:"

function readRecoveryMark(userId: string): number | null {
  try {
    return recoveryMarkRead(window.localStorage.getItem(`${RECOVERY_MARK}${userId}`))
  } catch (error: unknown) {
    console.error("[device-secret] could not read the recovery mark", error)
    return null
  }
}

function writeRecoveryMark(userId: string, at: number): void {
  try {
    window.localStorage.setItem(`${RECOVERY_MARK}${userId}`, String(at))
  } catch (error: unknown) {
    console.error("[device-secret] could not write the recovery mark", error)
  }
}

/**
 * Asks the admission route, through the native layer, whether the server still takes what this
 * device holds. The secret never enters this process: the plugin reads the keychain, makes the
 * request and hands back a status.
 *
 * A shell with no `present` method answers `unanswered`, which decides nothing — that is every
 * build shipped before this seam existed, and it must keep behaving exactly as it did.
 */
async function askAdmission(plugin: DeviceSecretPlugin): Promise<RouteRead> {
  const present = plugin.present
  if (present == null) return "unanswered"
  try {
    return routeRead(await present())
  } catch (error: unknown) {
    console.error("[device-secret] the admission probe threw", error)
    return "unanswered"
  }
}

/**
 * Lets go of a secret the route refuses, then mints another.
 *
 * The order is load-bearing. Emptying the keychain FIRST turns the unescapable state into the
 * self-escaping one: if the mint that follows discards its plaintext for any of the three
 * reasons it can, the device is left holding nothing, and a device holding nothing mints on its
 * next launch without needing to be told anything. The reverse order would leave a device
 * holding a refused secret and a server holding a rotated hash — which is the defect itself.
 *
 * A clear that fails stops the whole recovery. Rotating the server's hash while knowing the new
 * value cannot be stored is strictly worse than leaving the old dead one in place, and writing
 * no mark means the next launch tries again rather than waiting out the day.
 */
async function recoverAndMint(plugin: DeviceSecretPlugin, userId: string): Promise<void> {
  try {
    const cleared = await plugin.clear()
    if (!cleared.cleared) {
      console.error("[device-secret] the keychain refused to let go of the secret; not minting")
      return
    }
  } catch (error: unknown) {
    console.error("[device-secret] the keychain clear threw; not minting", error)
    return
  }
  writeRecoveryMark(userId, Date.now())
  await mintAndStore(plugin, userId)
}

async function mintAndStore(plugin: DeviceSecretPlugin, userId: string): Promise<void> {
  let deviceId: string | null
  try {
    deviceId = (await plugin.getDeviceId()).deviceId
  } catch (error: unknown) {
    console.error("[device-secret] getDeviceId threw", error)
    return
  }
  if (deviceId == null) {
    console.error("[device-secret] no identifierForVendor available; skipping mint")
    return
  }

  const body = mintDeviceSecretSchema.safeParse({ deviceId })
  if (!body.success) {
    console.error("[device-secret] built an invalid mint body", body.error.issues)
    return
  }

  let deviceSecret: string
  try {
    const res = await apiFetch("/api/device-secret/mint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body.data),
    })
    if (!res.ok) {
      console.error("[device-secret] mint POST failed", res.status)
      return
    }
    const payload = mintDeviceSecretResponseSchema.safeParse(await res.json())
    if (!payload.success) {
      console.error("[device-secret] mint response did not match the expected shape")
      return
    }
    deviceSecret = payload.data.deviceSecret
  } catch (error: unknown) {
    console.error("[device-secret] mint POST threw", error)
    return
  }

  try {
    await plugin.store({ secret: deviceSecret, userId })
    console.info("[device-secret] minted and stored a device secret")
  } catch (error: unknown) {
    // The plaintext is gone here and the server's hash has already rotated, so this device is
    // now presenting something the server will refuse — or nothing at all.
    //
    // What recovers it depends on what the keychain is left holding. The native store() deletes
    // before it adds, so the usual failure leaves it EMPTY, and an empty keychain mints on the
    // next launch on its own. The bad case is a delete that itself failed: the old item survives
    // the add, sits in the pinned domain, and satisfies every probe forever. That case is why
    // the admission route exists — the next launch presents the survivor, is refused, and lets
    // go of it. It is NOT "no recovery by design", which is what this said before and was false.
    console.error(
      "[device-secret] Keychain store FAILED — discarding the minted secret; the admission probe recovers it on a later launch",
      error
    )
  }
}

async function clearAndRevoke(plugin: DeviceSecretPlugin): Promise<void> {
  try {
    await plugin.clear()
    console.info("[device-secret] cleared the on-device secret")
  } catch (error: unknown) {
    console.error("[device-secret] Keychain clear failed", error)
  }

  try {
    const deviceId = (await plugin.getDeviceId()).deviceId
    if (deviceId == null) return
    const body = revokeDeviceSecretSchema.safeParse({ deviceId })
    if (!body.success) return
    const res = await apiFetch("/api/device-secret/revoke", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body.data),
    })
    if (!res.ok) {
      console.info("[device-secret] revoke POST not accepted", res.status)
    }
  } catch (error: unknown) {
    console.info("[device-secret] revoke POST threw; local copy already cleared", error)
  }
}

export function DeviceSecretSync() {
  const previousUserID = useRef<string | null>(null)
  const userID = useContext(UserIdContext)

  useEffect(() => {
    if (!isNativeShell()) return
    const plugin = getDeviceSecret()
    if (plugin == null) {
      console.error(
        "[device-secret] native shell but DeviceSecret plugin is missing — the build predates the keychain seam (stale packageClassList); this device cannot sync. Rebuild the shell (npm run ios:sync + TestFlight)."
      )
      return
    }

    const signedOutFrom = previousUserID.current
    previousUserID.current = userID

    let cancelled = false
    void (async () => {
      if (userID == null) {
        if (signedOutFrom == null) return
        await clearAndRevoke(plugin)
        return
      }
      const probe = await probeKeychain(plugin, userID)
      if (cancelled) return
      if (decideMintAction(probe) === "skip") {
        // The keychain says a secret is here and in the domain the widget extension reads. That
        // is everything the keychain can tell us, and it is not enough: a secret the server no
        // longer accepts looks exactly like a good one from this side. So ask the server.
        const admission = await askAdmission(plugin)
        if (cancelled) return
        const action = decideRecoveryAction({
          route: admission,
          recoveredAt: readRecoveryMark(userID),
          now: Date.now(),
        })
        if (action === "hold") {
          console.info(
            `[device-secret] a secret is stored in the shared access group and the route answered \`${admission}\`; not re-minting`
          )
          return
        }
        console.warn(
          "[device-secret] the route refuses the secret this device holds — letting it go and minting another"
        )
        await recoverAndMint(plugin, userID)
        return
      }
      if (probe.ok && probe.present) {
        console.warn(
          `[device-secret] a secret is stored, but in the ${probe.domain} keychain domain, which the widget extension cannot read — re-minting so it lands in the shared access group`
        )
      }
      await mintAndStore(plugin, userID)
    })()

    return () => {
      cancelled = true
    }
  }, [userID])

  return null
}
