"use client"

import { apiFetch } from "akasha/alan/web/modules/api-fetch/api-fetch.module.code.ts"
import {
  getPushNotifications,
  isNativeShell,
  type PluginListenerHandle,
} from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import { UserIdContext } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { decidePermissionAction } from "akasha/person/modules/push-permission/push-permission.module.code.ts"
import { registerDeviceTokenSchema } from "akasha/person/modules/push-register-body/push-register-body.module.code.ts"
import { useContext, useEffect } from "react"

async function postDeviceToken(deviceToken: string): Promise<void> {
  const body = registerDeviceTokenSchema.safeParse({ deviceToken, platform: "ios" })
  if (!body.success) {
    console.error("[push] built an invalid registration body", body.error.issues)
    return
  }
  const res = await apiFetch("/api/push/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body.data),
  })
  if (!res.ok) {
    throw new Error(`the device token was refused registration with ${res.status}`)
  }
}

export function PushRegistrationSync() {
  const userID = useContext(UserIdContext)

  useEffect(() => {
    if (!isNativeShell()) return
    if (userID == null) return
    const plugin = getPushNotifications()
    if (plugin == null) return

    let cancelled = false
    let regHandle: PluginListenerHandle | null = null
    let errHandle: PluginListenerHandle | null = null

    void (async () => {
      const current = await plugin.checkPermissions()
      let receive = current.receive
      if (decidePermissionAction(receive) === "request") {
        receive = (await plugin.requestPermissions()).receive
      }
      if (cancelled) return
      if (receive !== "granted") {
        console.info("[push] permission not granted; degrading (no re-prompt)", receive)
        return
      }

      regHandle = await plugin.addListener("registration", (token) => {
        void postDeviceToken(token.value)
      })
      errHandle = await plugin.addListener("registrationError", (event) => {
        console.error("[push] APNs registration error", event.error)
      })
      if (cancelled) {
        void regHandle.remove()
        void errHandle.remove()
        return
      }
      await plugin.register()
      console.info("[push] register() called; awaiting token")
    })()

    return () => {
      cancelled = true
      if (regHandle != null) void regHandle.remove()
      if (errHandle != null) void errHandle.remove()
    }
  }, [userID])

  return null
}
