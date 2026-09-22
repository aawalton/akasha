interface ZoNotificationProviderClass {
  Subclass: <T = object>() => T
  New: <T = object>(
    this: void,
    self: object,
    notificationManager: object,
    ...args: readonly unknown[]
  ) => T
}

declare const ZO_NotificationProvider: ZoNotificationProviderClass

interface ZoGamepadNotificationList {
  AddEntry: (template: string | number | undefined, entryData: object) => undefined
  AddEntryWithHeader: (template: string | number | undefined, entryData: object) => undefined
}

interface ZoGamepadNotificationManager {
  list: ZoGamepadNotificationList
  providers: object[]
  [key: string]: unknown
}

declare const GAMEPAD_NOTIFICATIONS: ZoGamepadNotificationManager

declare const ZO_KEYBOARD_NOTIFICATION_ICONS: Record<number, string>

declare const ZO_GAMEPAD_NOTIFICATION_ICONS: Record<number, string>

declare const ZO_NOTIFICATION_TYPE_TO_GAMEPAD_TEMPLATE: Record<number, string | number>

declare const SI_NOTIFICATIONS_TYPE_FORMATTER: number
