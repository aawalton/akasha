"use client"

import { decideOpenUrlRoute } from "@akasha/person-system/push-routing"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import {
  getApp,
  isNativeShell,
  type PluginListenerHandle,
} from "../capacitor-bridge/capacitor-bridge.module.code.ts"

export function DeepLinkOpenSync() {
  const navigate = useNavigate()
  const navigateRef = useRef(navigate)
  navigateRef.current = navigate

  useEffect(() => {
    if (!isNativeShell()) return
    const plugin = getApp()
    if (plugin == null) {
      console.error(
        "[deep-link] native shell but @capacitor/app plugin is missing — the build predates the @capacitor/app dep (stale packageClassList); widget taps will not route. Rebuild the shell (cap sync + TestFlight)."
      )
      return
    }

    const route = (url: string | null | undefined, source: string) => {
      if (url == null) return
      const path = decideOpenUrlRoute(url)
      if (path == null) {
        console.warn(`[deep-link] ${source} with no routable path`, url)
        return
      }
      console.info(`[deep-link] ${source} -> navigating`, path)
      navigateRef.current(path)
    }

    let handle: PluginListenerHandle | null = null
    let removed = false
    void (async () => {
      const h = await plugin.addListener("appUrlOpen", (event) => {
        route(event.url, "appUrlOpen")
      })
      if (removed) void h.remove()
      else handle = h
      try {
        const launch = await plugin.getLaunchUrl()
        route(launch?.url, "getLaunchUrl")
      } catch (error: unknown) {
        console.error("[deep-link] getLaunchUrl threw", error)
      }
    })()

    return () => {
      removed = true
      if (handle != null) void handle.remove()
    }
  }, [])

  return null
}
