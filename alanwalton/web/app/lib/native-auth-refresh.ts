import type { AppPlugin, PluginListenerHandle } from "~/lib/capacitor-bridge"

export interface AutoRefreshControl {
  startAutoRefresh: () => Promise<void>
  stopAutoRefresh: () => Promise<void>
}

export function wireNativeAuthRefresh(auth: AutoRefreshControl, app: AppPlugin): () => void {
  void auth.startAutoRefresh()

  let handle: PluginListenerHandle | null = null
  let removed = false
  void (async () => {
    const registered = await app.addListener("appStateChange", ({ isActive }) => {
      if (isActive) void auth.startAutoRefresh()
      else void auth.stopAutoRefresh()
    })
    if (removed) void registered.remove()
    else handle = registered
  })()

  return () => {
    removed = true
    if (handle !== null) void handle.remove()
    void auth.stopAutoRefresh()
  }
}
