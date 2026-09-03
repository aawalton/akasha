"use client"

import { useEffect } from "react"
import {
  getPushNotifications,
  isNativeShell,
  type PluginListenerHandle,
} from "../jenny-capacitor-bridge/jenny-capacitor-bridge.module.code.ts"

async function postDeviceToken(deviceToken: string): Promise<void> {
  try {
    const res = await fetch("/api/push/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceToken, platform: "ios" }),
    })
    if (res.ok) {
      console.info("[push] device token registered")
    } else {
      console.error("[push] register POST failed", res.status)
    }
  } catch (error: unknown) {
    console.error("[push] register POST threw", error)
  }
}

export function PushRegistrationSync() {
  useEffect(() => {
    if (!isNativeShell()) return
    const plugin = getPushNotifications()
    if (plugin == null) {
      console.error(
        "[push] native shell but PushNotifications plugin is missing — the build predates the @capacitor/push-notifications dep. Rebuild the shell (npm run ios:sync, then TestFlight)."
      )
      return
    }

    let cancelled = false
    let regHandle: PluginListenerHandle | null = null
    let errHandle: PluginListenerHandle | null = null

    void (async () => {
      const current = await plugin.checkPermissions()
      let receive = current.receive
      if (receive === "prompt" || receive === "prompt-with-rationale") {
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
  }, [])

  return null
}
