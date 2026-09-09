interface PluginListenerHandle {
  remove: () => Promise<void>
}

type PushPermissionState = "prompt" | "prompt-with-rationale" | "granted" | "denied"

interface PushPermissionStatus {
  receive: PushPermissionState
}

interface PushRegistrationToken {
  value: string
}

interface PushNotificationsEventMap {
  registration: PushRegistrationToken
  registrationError: { error?: unknown }
}

interface PushNotificationsPlugin {
  checkPermissions: () => Promise<PushPermissionStatus>
  requestPermissions: () => Promise<PushPermissionStatus>
  register: () => Promise<void>
  addListener: <E extends keyof PushNotificationsEventMap>(
    eventName: E,
    listener: (event: PushNotificationsEventMap[E]) => void
  ) => PluginListenerHandle | Promise<PluginListenerHandle>
}

interface Window {
  Capacitor?: {
    isNativePlatform?: () => boolean
    Plugins?: {
      PushNotifications?: PushNotificationsPlugin
    }
  }
}
