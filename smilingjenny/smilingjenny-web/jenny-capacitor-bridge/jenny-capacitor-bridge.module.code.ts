export function isNativeShell(): boolean {
  if (typeof window === "undefined") return false
  return window.Capacitor?.isNativePlatform?.() === true
}

export function getPushNotifications(): PushNotificationsPlugin | null {
  if (typeof window === "undefined") return null
  const plugin = window.Capacitor?.Plugins?.PushNotifications
  if (plugin == null) return null
  if (
    typeof plugin.checkPermissions !== "function" ||
    typeof plugin.requestPermissions !== "function" ||
    typeof plugin.register !== "function" ||
    typeof plugin.addListener !== "function"
  ) {
    return null
  }
  return plugin
}
