"use client"

import { decideOpenUrlRoute } from "akasha/persons/push-routing/push-routing.module.code.ts"
import { widgetTapped } from "akasha/readouts/widget-tap-link/widget-tap-link.module.code.ts"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { apiFetch } from "../api-fetch/api-fetch.module.code.ts"
import {
  getApp,
  isNativeShell,
  type PluginListenerHandle,
} from "../capacitor-bridge/capacitor-bridge.module.code.ts"

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

    let carried: string | null = null
    let launchRepeat: string | null = null

    const route = (url: string | null | undefined, source: string) => {
      if (url == null) return
      const repeats = url === launchRepeat
      launchRepeat = null
      carried = url
      if (!repeats) countTap(url)
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
        const link = launch?.url ?? null
        if (link !== null && link !== carried) {
          route(link, "getLaunchUrl")
          launchRepeat = link
        }
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
