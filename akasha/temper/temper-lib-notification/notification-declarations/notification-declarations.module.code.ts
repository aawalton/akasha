declare global {
  function type(
    this: void,
    v: unknown
  ): "nil" | "number" | "string" | "boolean" | "table" | "function" | "thread" | "userdata"

  function error(this: void, message: unknown, level?: number): never

  const table: {
    insert: <T>(this: void, list: T[], value: T) => undefined
  }

  interface Control {
    SetHidden: (hidden: boolean) => undefined
  }

  interface LabelControl extends Control {
    SetText: (text: string) => undefined
  }

  interface TextureControl extends Control {
    SetTexture: (texture: string) => undefined
  }

  const GetControl: (this: void, parent: Control, name: string) => Control
  const GetString: (this: void, stringId: number | string, index?: number) => string
  const zo_strformat: (this: void, format: number | string, ...args: unknown[]) => string

  interface ZoNotificationProviderClass {
    Subclass: <T = object>() => T
    New: <T = object>(
      this: void,
      self: object,
      notificationManager: object,
      ...args: readonly unknown[]
    ) => T
  }
  const ZO_NotificationProvider: ZoNotificationProviderClass

  interface ZoGamepadEntryData {
    data: unknown
    SetIconTintOnSelection: (enabled: boolean) => undefined
    SetIconDisabledTintOnSelection: (enabled: boolean) => undefined
    SetHeader: (headingText: string) => undefined
    [key: string]: unknown
  }

  interface ZoGamepadEntryDataClass {
    New: (
      this: ZoGamepadEntryDataClass,
      displayName: string | undefined,
      icon?: string,
      ...args: readonly unknown[]
    ) => ZoGamepadEntryData
  }
  const ZO_GamepadEntryData: ZoGamepadEntryDataClass

  const ZO_SortFilterList: {
    SetupRow: (this: void, list: object, control: object, data: object) => undefined
  }

  const ZO_ClearNumericallyIndexedTable: <T>(this: void, list: T[]) => undefined
  const ZO_DeepTableCopy: <T>(this: void, source: T) => T

  interface ZoKeyboardNotificationManager {
    sortFilterList: object
    providers: object[]
    [key: string]: unknown
  }

  interface ZoGamepadNotificationList {
    AddEntry: (template: string | number | undefined, entryData: object) => undefined
    AddEntryWithHeader: (template: string | number | undefined, entryData: object) => undefined
  }

  interface ZoGamepadNotificationManager {
    list: ZoGamepadNotificationList
    providers: object[]
    [key: string]: unknown
  }

  const NOTIFICATIONS: ZoKeyboardNotificationManager | undefined
  const GAMEPAD_NOTIFICATIONS: ZoGamepadNotificationManager

  const ZO_KEYBOARD_NOTIFICATION_ICONS: Record<number, string>
  const ZO_GAMEPAD_NOTIFICATION_ICONS: Record<number, string>
  const ZO_NOTIFICATION_TYPE_TO_GAMEPAD_TEMPLATE: Record<number, string | number>

  const SI_NOTIFICATIONS_TYPE_FORMATTER: number
}

export {}
