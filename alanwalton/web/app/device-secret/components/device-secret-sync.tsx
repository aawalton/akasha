"use client"

import { UserIdContext } from "@akasha/pages-ui/use-user-id"
import { useContext, useEffect, useRef } from "react"
import {
  mintDeviceSecretResponseSchema,
  mintDeviceSecretSchema,
  revokeDeviceSecretSchema,
} from "@akasha/person-system/device-secret-body"
import {
  decideMintAction,
  domainSaid,
  type PeekProbe,
} from "@akasha/person-system/device-secret-minting"
import { apiFetch } from "~/lib/api-fetch"
import { type DeviceSecretPlugin, getDeviceSecret, isNativeShell } from "~/lib/capacitor-bridge"

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
      "[device-secret] Keychain store FAILED — discarding the minted secret (no recovery by design; it re-mints on next launch)",
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
        console.info(
          "[device-secret] secret already stored for this identity in the shared access group; not re-minting"
        )
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
