import {
  GAMEPAD_PROVIDER,
  KEYBOARD_PROVIDER,
} from "akasha/temper/addon/pages/hud/temper-notification/modules/notification-providers/notification-providers.module.code.ts"
import type {
  NotificationApi,
  NotificationProviderInstance,
  ProviderLinkTable,
} from "akasha/temper/addon/pages/hud/temper-notification/modules/notification-types/notification-types.module.code.ts"
import "akasha/temper/addon/pages/hud/temper-notification/notification-declarations/notification-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"

function createProvider(this: void): ProviderLinkTable {
  let keyboardProvider: NotificationProviderInstance | undefined
  if (NOTIFICATIONS !== undefined) {
    keyboardProvider = KEYBOARD_PROVIDER.New(KEYBOARD_PROVIDER, NOTIFICATIONS)
  }
  const gamepadProvider = GAMEPAD_PROVIDER.New(GAMEPAD_PROVIDER, GAMEPAD_NOTIFICATIONS)

  const provider: ProviderLinkTable = {
    notifications: [],
    keyboardProvider,
    gamepadProvider,
    UpdateNotifications: (): undefined => {
      if (keyboardProvider !== undefined) {
        keyboardProvider.pushUpdateCallback()
      }
      gamepadProvider.pushUpdateCallback()
    },
  }
  if (keyboardProvider !== undefined) {
    keyboardProvider.providerLinkTable = provider
  }
  gamepadProvider.providerLinkTable = provider

  return provider
}

export const NOTIFICATION_API: NotificationApi = {
  CreateProvider: createProvider,
}
