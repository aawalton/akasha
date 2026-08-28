"use client"

import { UserIdContext } from "@shared/pages-ui/use-user-id"
import { useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { apiFetch } from "~/lib/api-fetch"
import {
  getPushNotifications,
  isNativeShell,
  type PluginListenerHandle,
} from "~/lib/capacitor-bridge"
import { decidePermissionAction, decidePushRoute } from "~/push/lib/push-routing"
import { RegisterDeviceTokenSchema } from "~/push/lib/register-body"

async function postDeviceToken(deviceToken: string): Promise<void> {
  const body = RegisterDeviceTokenSchema.safeParse({ deviceToken, platform: "ios" })
  if (!body.success) {
    console.error("[push] built an invalid registration body", body.error.issues)
    return
  }
  try {
    const res = await apiFetch("/api/push/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body.data),
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
  const userID = useContext(UserIdContext)
  const navigate = useNavigate()
  const navigateRef = useRef(navigate)
  navigateRef.current = navigate

  useEffect(() => {
    if (!isNativeShell()) return
    const plugin = getPushNotifications()
    if (plugin == null) {
      console.error(
        "[push] native shell but PushNotifications plugin is missing — the build predates the @capacitor/push-notifications dep (stale packageClassList); taps will not route. Rebuild the shell (npm run ios:sync + TestFlight)."
      )
      return
    }
    let handle: PluginListenerHandle | null = null
    let removed = false
    void (async () => {
      const h = await plugin.addListener("pushNotificationActionPerformed", (event) => {
        const path = decidePushRoute(event.notification?.data)
        if (path == null) {
          console.warn("[push] tap with no routable path", event.notification?.data)
          return
        }
        console.info("[push] tap -> navigating", path)
        navigateRef.current(path)
      })
      if (removed) void h.remove()
      else handle = h
    })()
    return () => {
      removed = true
      if (handle != null) void handle.remove()
    }
  }, [])

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
