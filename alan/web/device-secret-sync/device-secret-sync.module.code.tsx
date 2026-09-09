"use client"

import { UserIdContext } from "@akasha/pages-ui/use-user-id"
import {
  mintDeviceSecretResponseSchema,
  mintDeviceSecretSchema,
  revokeDeviceSecretSchema,
} from "@akasha/persons/device-secret-body"
import {
  decideMintAction,
  decideRecoveryAction,
  domainSaid,
  type PeekProbe,
  type RouteRead,
  recoveryMarkRead,
  routeRead,
} from "@akasha/persons/device-secret-minting"
import { useContext, useEffect, useRef } from "react"
import { apiFetch } from "../api-fetch/api-fetch.module.code.ts"
import {
  type DeviceSecretPlugin,
  getDeviceSecret,
  isNativeShell,
} from "../capacitor-bridge/capacitor-bridge.module.code.ts"

async function probeKeychain(plugin: DeviceSecretPlugin, userId: string): Promise<PeekProbe> {
  try {
    const result = await plugin.peek({ userId })
    return { ok: true, present: result.present, domain: domainSaid(result.domain) }
  } catch (error: unknown) {
    console.error("[device-secret] Keychain probe failed; treating as absent", error)
    return { ok: false }
  }
}

const RECOVERY_MARK = "device-secret-recovered-at:"

function readRecoveryMark(userId: string): number | null {
  try {
    return recoveryMarkRead(window.localStorage.getItem(`${RECOVERY_MARK}${userId}`))
  } catch (error: unknown) {
    console.error("[device-secret] could not read the recovery mark", error)
    return null
  }
}

function writeRecoveryMark(userId: string, at: number): undefined {
  try {
    window.localStorage.setItem(`${RECOVERY_MARK}${userId}`, String(at))
  } catch (error: unknown) {
    console.error("[device-secret] could not write the recovery mark", error)
  }
}

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
