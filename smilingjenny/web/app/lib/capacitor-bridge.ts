export interface PluginListenerHandle {
  remove: () => Promise<void>
}

export type PushPermissionState = "prompt" | "prompt-with-rationale" | "granted" | "denied"

export interface PushPermissionStatus {
  receive: PushPermissionState
}

export interface PushRegistrationToken {
  value: string
}

export interface PushNotificationsEventMap {
  registration: PushRegistrationToken
  registrationError: { error?: unknown }
}

export interface PushNotificationsPlugin {
  checkPermissions: () => Promise<PushPermissionStatus>
  requestPermissions: () => Promise<PushPermissionStatus>
  register: () => Promise<void>
  addListener: <E extends keyof PushNotificationsEventMap>(
    eventName: E,
    listener: (event: PushNotificationsEventMap[E]) => void
  ) => PluginListenerHandle | Promise<PluginListenerHandle>
}

declare global {
  interface Window {
    Capacitor?: {
      isNativePlatform?: () => boolean
      Plugins?: {
        PushNotifications?: PushNotificationsPlugin
      }
    }
  }
}

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
