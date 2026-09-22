import "akasha/temper/addon/pages/hud/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export type TextureFn = (this: void, data: NotificationData) => string

export interface NotificationData {
  notificationType: number
  texture?: string | TextureFn
  heading?: string
  index?: number
  shortDisplayText?: string
  acceptText?: unknown
  declineText?: unknown
  keyboardAcceptCallback?: (this: void, data: NotificationData) => undefined
  keyboardDeclineCallback?: (this: void, data: NotificationData) => undefined
  keybaordDeclineCallback?: (this: void, data: NotificationData) => undefined
  gamepadAcceptCallback?: (this: void, data: NotificationData) => undefined
  gamepadDeclineCallback?: (this: void, data: NotificationData) => undefined
  [key: string]: unknown
}

export interface NotificationRowControl extends Control {
  notificationType?: number
  index?: number
  acceptText?: unknown
  declineText?: unknown
  data?: NotificationData
  [key: string]: unknown
}

export interface NotificationManager {
  providers: object[]
  [key: string]: unknown
}

export interface NotificationProviderInstance {
  list: NotificationData[]
  providerLinkTable: ProviderLinkTable
  pushUpdateCallback: (this: NotificationProviderInstance) => undefined
  [key: string]: unknown
}

export interface NotificationProviderClass {
  Subclass: <T = NotificationProviderClass>(this: NotificationProviderClass) => T
  New: (
    this: void,
    self: NotificationProviderClass,
    notificationManager: NotificationManager
  ) => NotificationProviderInstance
  BuildNotificationList: (this: NotificationProviderInstance) => undefined
  Accept: (this: NotificationProviderInstance, data: NotificationData) => undefined
  Decline: (
    this: NotificationProviderInstance,
    data: NotificationData,
    button?: unknown,
    openedFromKeybind?: unknown
  ) => undefined
  [key: string]: unknown
}

export interface ProviderLinkTable {
  notifications: NotificationData[]
  keyboardProvider: NotificationProviderInstance | undefined
  gamepadProvider: NotificationProviderInstance
  UpdateNotifications: (this: void) => undefined
}

export interface NotificationApi {
  CreateProvider: (this: void) => ProviderLinkTable
}
