import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-errors/modules/errors-addon-entry/errors-addon-entry.module.code.ts"
import "akasha/temper/addon/pages/temper-core/modules/hud-addon-public-api/hud-addon-public-api.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-debug-logger/modules/debug-logger-main/debug-logger-main.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-entry-point/addon-menu-entry-point.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-async/modules/async-main/async-main.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-main/chat-message-main.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/custom-menu-main/custom-menu-main.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-main-menu/modules/main-menu-entry/main-menu-entry.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-notification/modules/notification-entry/notification-entry.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-main/scrollable-menu-main.module.code.ts"

import { initializeHudBar } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-bar/hud-addon-bar.module.code.ts"
import {
  installBuiltinFields,
  resetSession,
} from "akasha/temper/addon/pages/temper-core/modules/hud-addon-builtins/hud-addon-builtins.module.code.ts"
import { initializeTemperCommands } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-command/hud-addon-command.module.code.ts"
import { initializeComponentHiding } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-hide-init/hud-addon-hide-init.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-names/hud-addon-names.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-saved-variables/hud-addon-saved-variables.module.code.ts"
import { initializeSettingsPanel } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-settings-panel/hud-addon-settings-panel.module.code.ts"
import { initializeEvents } from "akasha/temper/addon/pages/temper-core/temper-events/modules/events-addon-loaded/events-addon-loaded.module.code.ts"
import { initializeHousing } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-load/housing-load.module.code.ts"
import { initializeInterface } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/interface-load/interface-load.module.code.ts"
import { initializeKeybinder } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-entry/keybinder-entry.module.code.ts"
import { initializeSelector } from "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-entry/selector-entry.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"

function initialize(this: void): undefined {
  initializeSavedVariables()
  initializeHudBar()
  initializeComponentHiding()
  initializeSettingsPanel()
  installBuiltinFields()
  initializeTemperCommands()
  initializeSelector()
  initializeEvents()
  initializeHousing()
  initializeKeybinder()
  initializeInterface()

  EVENT_MANAGER.RegisterForEvent(
    `${ADDON_NAME}_PlayerActivated`,
    EVENT_PLAYER_ACTIVATED,
    function (this: void, _eventCode: number, initial: boolean): undefined {
      if (initial) resetSession()
    }
  )
}

registerAddonInit(ADDON_NAME, initialize)
