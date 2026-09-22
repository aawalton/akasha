import { initSavedVariables } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-saved-variables/writ-saved-variables.module.code.ts"
import { createSettingsWindow } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-settings-window/writ-settings-window.module.code.ts"
import { registerSlashCommands } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-slash-command/writ-slash-command.module.code.ts"
import { smithingInit } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-smith-schema/writ-smith-schema.module.code.ts"
import { tooltipInterceptInstall } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-tooltip/writ-tooltip.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/modules/writ-parser-dispatch/writ-parser-dispatch.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/modules/writ-public-api/writ-public-api.module.code.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function initializeTemperWrit(): undefined {
  ZO_CreateStringId("SI_KEYBINDINGS_CATEGORY_WRIT_WORTHY", "TemperWrit")

  initSavedVariables()

  registerSlashCommands()
  smithingInit()

  tooltipInterceptInstall()
  createSettingsWindow()
}
