import {
  hookKeybindingListCallbacks,
  hookKeybindingListFilter,
} from "akasha/temper/addon/pages/keybinder/modules/addon-keybinds-list-hooks/addon-keybinds-list-hooks.module.code.ts"
import { addGameMenuEntry } from "akasha/temper/addon/pages/keybinder/modules/addon-keybinds-menu-entry/addon-keybinds-menu-entry.module.code.ts"
import {
  CATEGORY_DATA_TYPE,
  KEYBIND_DATA_TYPE,
  LAK_NAME,
} from "akasha/temper/addon/pages/keybinder/modules/addon-keybinds-names/addon-keybinds-names.module.code.ts"
import {
  ADDON_KEYBINDS,
  STANDARD_KEYBINDS,
} from "akasha/temper/addon/pages/keybinder/modules/addon-keybinds-strings/addon-keybinds-strings.module.code.ts"
import type { LakTable } from "akasha/temper/addon/pages/keybinder/modules/addon-keybinds-types/addon-keybinds-types.module.code.ts"
import "akasha/temper/addon/pages/keybinder/addon-keybinds-declarations/addon-keybinds-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-keybindings/eso-keybindings.type-declaration.d.ts"

export function onLoad(
  this: void,
  lak: LakTable,
  keybindingManager: KeybindingManager,
  eventCode: number,
  addonName: string
): undefined {
  if (addonName !== "ZO_Ingame") {
    return undefined
  }
  EVENT_MANAGER.UnregisterForEvent(LAK_NAME, eventCode)

  SafeAddString(SI_GAME_MENU_KEYBINDINGS, STANDARD_KEYBINDS, 1)
  addGameMenuEntry(lak, keybindingManager, ADDON_KEYBINDS)

  hookKeybindingListCallbacks(
    CATEGORY_DATA_TYPE,
    "libAddonKeybinds.SetupCategoryHeader",
    "libAddonKeybinds.HideCategoryHeader"
  )
  hookKeybindingListCallbacks(
    KEYBIND_DATA_TYPE,
    "libAddonKeybinds.SetupKeybindRow",
    "libAddonKeybinds.HideKeybindRow"
  )
  hookKeybindingListFilter(lak, keybindingManager)
  return undefined
}
