"use client"

import { decideOpenUrlRoute } from "@akasha/person-system/push-routing"
import { widgetTapped } from "@akasha/readout-system/widget-tap-link"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { apiFetch } from "../api-fetch/api-fetch.module.code.ts"
import {
  getApp,
  isNativeShell,
  type PluginListenerHandle,
} from "../capacitor-bridge/capacitor-bridge.module.code.ts"

// THE WIDGET'S NAME IS READ OFF THE RAW LINK, not off the path the link routes to.
// `decideOpenUrlRoute` builds that path from the pathname and the search alone, so the name sits in
// the fragment where it cannot change where the tap lands.
function countTap(url: string): undefined {
  const widget = widgetTapped(url)
  if (widget === null) return
  void apiFetch("/api/widget-tap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ widget }),
  })
    .then((answered) => {
      if (!answered.ok) {
        console.warn("[deep-link] tap not counted", widget, answered.status)
      }
    })
    .catch((error: unknown) => {
      console.warn("[deep-link] tap not counted", widget, error)
    })
}

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
      countTap(url)
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
