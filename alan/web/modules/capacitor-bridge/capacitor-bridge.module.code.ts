export interface PluginListenerHandle {
  remove: () => Promise<void>
}

export interface FilesystemPlugin {
  getUri: (options: { path: string; directory: "DOCUMENTS" }) => Promise<{ uri: string }>
  stat: (options: { path: string; directory: "DOCUMENTS" }) => Promise<{ size: number }>
  rename: (options: { from: string; to: string; directory: "DOCUMENTS" }) => Promise<void>
  readdir: (options: { path: string; directory: "DOCUMENTS" }) => Promise<{ files: unknown }>
  readFile: (options: {
    path: string
    directory: "DOCUMENTS"
    encoding?: "utf8"
  }) => Promise<{ data: string }>
  writeFile: (options: {
    path: string
    data: string
    directory: "DOCUMENTS"
    encoding?: "utf8"
  }) => Promise<{ uri?: string }>
  deleteFile?: (options: { path: string; directory: "DOCUMENTS" }) => Promise<void>
  appendFile?: (options: { path: string; data: string; directory: "DOCUMENTS" }) => Promise<void>
}

export interface StatusBarPlugin {
  hide: () => Promise<void>
  show: () => Promise<void>
}

export interface PushPermissionStatus {
  receive: "prompt" | "prompt-with-rationale" | "granted" | "denied"
}

export interface PushRegistrationToken {
  value: string
}

export interface PushActionPerformed {
  actionId: string
  notification: { data?: unknown }
}

export interface PushNotificationsEventMap {
  registration: PushRegistrationToken
  registrationError: { error?: unknown }
  pushNotificationActionPerformed: PushActionPerformed
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

export interface BadgePlugin {
  setCount: (options: { count: number }) => Promise<void>
}

export interface DeviceSecretPlugin {
  getDeviceId: () => Promise<{ deviceId: string | null }>
  peek: (options: {
    userId: string
  }) => Promise<{ present: boolean; fingerprint: string | null; domain: string }>
  store: (options: { secret: string; userId: string }) => Promise<{ domain: string }>
  clear: () => Promise<{ cleared: boolean }>
  present?: () => Promise<{ held: boolean; status: number }>
}

export interface AppState {
  isActive: boolean
}

export interface AppUrlOpen {
  url: string
}

export interface AppEventMap {
  appStateChange: AppState
  appUrlOpen: AppUrlOpen
}

export interface AppPlugin {
  addListener: <E extends keyof AppEventMap>(
    eventName: E,
    listener: (event: AppEventMap[E]) => void
  ) => PluginListenerHandle | Promise<PluginListenerHandle>
  getLaunchUrl: () => Promise<AppUrlOpen | null | undefined>
}

export interface KokoroTtsEventMap {
  progress: { positionFraction: number; playedSeconds: number }
  waiting: Record<string, never>
  playing: Record<string, never>
  ended: Record<string, never>
  error: { message: string }
  downloadProgress: { received: number; total: number }
}

export interface KokoroTtsPlugin {
  prepare: () => Promise<{ ready: boolean }>
  startChapter: (options: {
    chapterId: string
    text: string
    voice?: string
    startFraction?: number
  }) => Promise<void>
  pause: () => Promise<void>
  resume: () => Promise<void>
  stop: () => Promise<void>
  seek: (options: { fraction: number }) => Promise<void>
  setRate: (options: { rate: number }) => Promise<void>
  getState: () => Promise<{
    playing: boolean
    paused: boolean
    positionFraction: number
    ready: boolean
    generating: boolean
  }>
  addListener: <E extends keyof KokoroTtsEventMap>(
    eventName: E,
    listener: (event: KokoroTtsEventMap[E]) => void
  ) => PluginListenerHandle | Promise<PluginListenerHandle>
}

interface CapacitorGlobal {
  isNativePlatform?: () => boolean
  Plugins?: {
    Filesystem?: FilesystemPlugin
    StatusBar?: StatusBarPlugin
    PushNotifications?: PushNotificationsPlugin
    Badge?: BadgePlugin
    App?: AppPlugin
    KokoroTts?: KokoroTtsPlugin
    DeviceSecret?: DeviceSecretPlugin
  }
}

function capacitorGlobal(): CapacitorGlobal | undefined {
  if (typeof window === "undefined") return undefined
  return (window as { Capacitor?: CapacitorGlobal }).Capacitor
}

export function isNativeShell(): boolean {
  return capacitorGlobal()?.isNativePlatform?.() === true
}

export function getStatusBar(): StatusBarPlugin | null {
  const plugin = capacitorGlobal()?.Plugins?.StatusBar
  if (plugin == null) return null
  if (typeof plugin.hide !== "function" || typeof plugin.show !== "function") return null
  return plugin
}

export function getFilesystem(): FilesystemPlugin | null {
  const plugin = capacitorGlobal()?.Plugins?.Filesystem
  if (plugin == null) return null
  if (
    typeof plugin.readFile !== "function" ||
    typeof plugin.writeFile !== "function" ||
    typeof plugin.rename !== "function"
  ) {
    return null
  }
  return plugin
}

export function getPushNotifications(): PushNotificationsPlugin | null {
  const plugin = capacitorGlobal()?.Plugins?.PushNotifications
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

export function getBadge(): BadgePlugin | null {
  const plugin = capacitorGlobal()?.Plugins?.Badge
  if (plugin == null) return null
  if (typeof plugin.setCount !== "function") return null
  return plugin
}

export function getDeviceSecret(): DeviceSecretPlugin | null {
  const plugin = capacitorGlobal()?.Plugins?.DeviceSecret
  if (plugin == null) return null
  if (typeof plugin.getDeviceId !== "function") return null
  if (typeof plugin.peek !== "function") return null
  if (typeof plugin.store !== "function") return null
  if (typeof plugin.clear !== "function") return null
  return plugin
}

export function getApp(): AppPlugin | null {
  const plugin = capacitorGlobal()?.Plugins?.App
  if (plugin == null) return null
  if (typeof plugin.addListener !== "function") return null
  return plugin
}

export function getKokoroTts(): KokoroTtsPlugin | null {
  const plugin = capacitorGlobal()?.Plugins?.KokoroTts
  if (plugin == null) return null
  if (
    typeof plugin.startChapter !== "function" ||
    typeof plugin.prepare !== "function" ||
    typeof plugin.addListener !== "function"
  ) {
    return null
  }
  return plugin
}
