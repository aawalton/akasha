import {
  asGlobalTable,
  asTyped,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { asScrollableMenuHandleOpt } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts-tables/sets-core-casts-tables.module.code.ts"
import "akasha/temper/addon/type/temper-custom-menu-global/temper-custom-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-scrollable-menu-global/temper-scrollable-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-addon-menu/lib-addon-menu.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

let scrollableMenuHandle: { version?: string } | undefined
let SCROLLABLE_MENU_WAS_CHECKED = false

function checkOptionalScrollableMenu(this: void): undefined {
  if (!SCROLLABLE_MENU_WAS_CHECKED && scrollableMenuHandle === undefined) {
    scrollableMenuHandle = asScrollableMenuHandleOpt(TemperScrollableMenu)
    SCROLLABLE_MENU_WAS_CHECKED = true
    if (scrollableMenuHandle !== undefined && (scrollableMenuHandle.version ?? "") >= "2.43") {
      lib.scrollableMenu = scrollableMenuHandle
    }
  }
}

function checkOptionalLibraries(this: void): undefined {
  checkOptionalScrollableMenu()
  lib.customMenu = TemperCustomMenu
  lib.libAddonMenu = LibAddonMenu2
  lib.libSlashCommander = asGlobalTable(globalThis).LibSlashCommander
  lib.libZone = asGlobalTable(globalThis).LibZone
}
lib.CheckOptionalLibraries = checkOptionalLibraries

function checkScrollableMenu(this: void): boolean {
  checkOptionalScrollableMenu()
  return scrollableMenuHandle !== undefined
}
lib.CheckScrollableMenu = checkScrollableMenu

lib.lookupTableItemSetIdToItemSetCollectionsCategory = {}

const CALL_HELP_PARAMS: { [param: string]: boolean } = {
  list: true,
  help: true,
  hilfe: true,
  aide: true,
  ヘルプ: true,
  ayuda: true,
  помощь: true,
  帮助: true,
}
const CALL_SEARCH_PARAMS: { [param: string]: boolean } = {
  search: true,
  suche: true,
  cherche: true,
  検索: true,
  buscar: true,
  поиск: true,
  搜索: true,
}
const CALL_DEBUG_PARAMS: { [param: string]: string | ((this: void) => void) } = {
  resetsv: "DebugResetSavedVariables",
  scanitemids: "DebugScanAllSetData",

  getall: "DebugGetAllData",
  getallnoitemids: () => {
    lib.DebugGetAllData(true, true, false)
  },
  getallnames: "DebugGetAllNames",

  getzones: "DebugGetAllZoneInfo",
  getmapnamess: "DebugGetAllMapNames",

  getwayshrines: "DebugGetAllWayshrineInfo",
  getwayshrinenames: "DebugGetAllWayshrineNames",

  getsetnames: "DebugGetAllSetNames",
  shownewsets: "DebugShowNewSetIds",

  getdungeons: "DebugGetDungeonFinderData",
  getachievementcategorynames: "DebugGetAllAchievementCategoryNames",
  getdlcnames: "DebugGetAllCollectibleDLCNames",
}

const libInternal = asTyped<{ [slot: string]: unknown }>(lib)
libInternal["_callHelpParams"] = CALL_HELP_PARAMS
libInternal["_callSearchParams"] = CALL_SEARCH_PARAMS
libInternal["_callDebugParams"] = CALL_DEBUG_PARAMS
