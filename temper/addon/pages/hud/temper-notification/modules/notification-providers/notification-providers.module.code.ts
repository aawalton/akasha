import type {
  NotificationData,
  NotificationManager,
  NotificationProviderClass,
  NotificationProviderInstance,
} from "akasha/temper/addon/pages/hud/temper-notification/modules/notification-types/notification-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-notification/notification-declarations/notification-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"

const NOTIFICATION_PROVIDER = ZO_NotificationProvider.Subclass<NotificationProviderClass>()

NOTIFICATION_PROVIDER.New = function (
  this: void,
  self: NotificationProviderClass,
  notificationManager: NotificationManager
): NotificationProviderInstance {
  const provider = ZO_NotificationProvider.New<NotificationProviderInstance>(
    self,
    notificationManager
  )
  table.insert(notificationManager.providers, provider)
  return provider
}

NOTIFICATION_PROVIDER.BuildNotificationList = function (
  this: NotificationProviderInstance
): undefined {
  ZO_ClearNumericallyIndexedTable(this.list)

  const notifications = this.providerLinkTable.notifications
  this.list = ZO_DeepTableCopy(notifications)
}

const KEYBOARD_PROVIDER = NOTIFICATION_PROVIDER.Subclass<NotificationProviderClass>()

KEYBOARD_PROVIDER.New = function (
  this: void,
  self: NotificationProviderClass,
  notificationManager: NotificationManager
): NotificationProviderInstance {
  return NOTIFICATION_PROVIDER.New(self, notificationManager)
}

KEYBOARD_PROVIDER.Accept = function (
  this: NotificationProviderInstance,
  data: NotificationData
): undefined {
  if (data.keyboardAcceptCallback !== undefined) {
    data.keyboardAcceptCallback(data)
  }
}

KEYBOARD_PROVIDER.Decline = function (
  this: NotificationProviderInstance,
  data: NotificationData,
  _button?: unknown,
  _openedFromKeybind?: unknown
): undefined {
  const callback = data.keyboardDeclineCallback ?? data.keybaordDeclineCallback
  if (callback !== undefined) {
    callback(data)
  }
}

const GAMEPAD_PROVIDER = NOTIFICATION_PROVIDER.Subclass<NotificationProviderClass>()

GAMEPAD_PROVIDER.New = function (
  this: void,
  self: NotificationProviderClass,
  notificationManager: NotificationManager
): NotificationProviderInstance {
  return NOTIFICATION_PROVIDER.New(self, notificationManager)
}

GAMEPAD_PROVIDER.Accept = function (
  this: NotificationProviderInstance,
  data: NotificationData
): undefined {
  if (data.gamepadAcceptCallback !== undefined) {
    data.gamepadAcceptCallback(data)
  }
}

GAMEPAD_PROVIDER.Decline = function (
  this: NotificationProviderInstance,
  data: NotificationData,
  _button?: unknown,
  _openedFromKeybind?: unknown
): undefined {
  if (data.gamepadDeclineCallback !== undefined) {
    data.gamepadDeclineCallback(data)
  }
}

export { GAMEPAD_PROVIDER, KEYBOARD_PROVIDER }
