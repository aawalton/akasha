"use client"

import { UserIdContext } from "@shared/pages-ui/use-user-id"
import { useContext, useEffect, useRef } from "react"
import {
  MintDeviceSecretResponseSchema,
  MintDeviceSecretSchema,
  RevokeDeviceSecretSchema,
} from "~/device-secret/lib/device-secret"
import { decideMintAction, type PeekProbe } from "~/device-secret/lib/mint-decision"
import { apiFetch } from "~/lib/api-fetch"
import { type DeviceSecretPlugin, getDeviceSecret, isNativeShell } from "~/lib/capacitor-bridge"

async function probeKeychain(plugin: DeviceSecretPlugin, userId: string): Promise<PeekProbe> {
  try {
    const result = await plugin.peek({ userId })
    return { ok: true, present: result.present }
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

  const body = MintDeviceSecretSchema.safeParse({ deviceId })
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
    const payload = MintDeviceSecretResponseSchema.safeParse(await res.json())
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
    const body = RevokeDeviceSecretSchema.safeParse({ deviceId })
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
        console.info("[device-secret] secret already stored for this identity; not re-minting")
        return
      }
      await mintAndStore(plugin, userID)
    })()

    return () => {
      cancelled = true
    }
  }, [userID])

  return null
}
