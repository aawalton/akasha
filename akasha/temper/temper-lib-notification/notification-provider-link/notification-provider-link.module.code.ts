import {
  GAMEPAD_PROVIDER,
  KEYBOARD_PROVIDER,
} from "../notification-providers/notification-providers.module.code.ts"
import type {
  Lib,
  LibNotificationProviderInstance,
  ProviderLinkTable,
} from "../notification-types/notification-types.module.code.ts"

function createProvider(this: void): ProviderLinkTable {
  let keyboardProvider: LibNotificationProviderInstance | undefined
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

export const NOTIFICATION_LIB: Lib = {
  CreateProvider: createProvider,
}
