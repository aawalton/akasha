import {
  getStatusBar,
  isNativeShell,
  type StatusBarStyle,
} from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import {
  classifyStatusBarBridge,
  decideStatusBarCall,
} from "akasha/alan/web/modules/status-bar-chrome/status-bar-chrome.module.code.ts"
import { useEffect } from "react"

function styleOfScheme(): StatusBarStyle {
  return document.documentElement.dataset.scheme === "light" ? "LIGHT" : "DARK"
}

export function StatusBarSync() {
  useEffect(() => {
    const statusBar = getStatusBar()
    if (!isNativeShell() || statusBar?.setStyle === undefined) return
    const sync = () => {
      statusBar.setStyle?.({ style: styleOfScheme() }).catch((error: unknown) => {
        console.error("[status-bar-sync] setStyle -> rejected", error)
      })
    }
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-scheme"],
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const statusBar = getStatusBar()
    const state = classifyStatusBarBridge(isNativeShell(), statusBar != null)
    if (state === "web") return
    if (state === "native-missing-plugin" || statusBar == null) {
      console.error(
        "[status-bar-sync] native shell detected but StatusBar plugin is missing — the native build predates the @capacitor/status-bar dep (stale packageClassList); status bar will not sync. Rebuild the shell (npm run ios:sync + TestFlight)."
      )
      return
    }
    console.info("[status-bar-sync] ready — native shell with StatusBar plugin")

    let prev: boolean | null = null
    const sync = () => {
      const next = document.documentElement.dataset.chromeHidden !== undefined
      const call = decideStatusBarCall(prev, next)
      prev = next
      if (call === null) return
      statusBar[call]().then(
        () => {
          console.info(`[status-bar-sync] ${call} -> resolved`)
        },
        (error: unknown) => {
          console.error(`[status-bar-sync] ${call} -> rejected`, error)
        }
      )
    }

    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-chrome-hidden"],
    })
    return () => {
      observer.disconnect()
      statusBar.show().catch(() => {})
    }
  }, [])

  return null
}
