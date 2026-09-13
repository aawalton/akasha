export function decideStatusBarCall(prev: boolean | null, next: boolean): "hide" | "show" | null {
  if (next === prev) return null
  if (next) return "hide"
  if (prev === null) return null
  return "show"
}

export type StatusBarBridgeState = "web" | "native-missing-plugin" | "ready"

export function classifyStatusBarBridge(
  isNative: boolean,
  hasPlugin: boolean
): StatusBarBridgeState {
  if (!isNative) return "web"
  return hasPlugin ? "ready" : "native-missing-plugin"
}
