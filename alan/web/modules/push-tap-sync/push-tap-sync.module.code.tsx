"use client"

import {
  getPushNotifications,
  isNativeShell,
  type PluginListenerHandle,
} from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import { decidePushRoute } from "akasha/person/modules/push-routing/push-routing.module.code.ts"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"

export function PushTapSync() {
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

  return null
}
