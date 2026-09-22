import {
  GLOBAL_PACK_NAME,
  MAX_ADDON_LOAD_PACK_KEYBINDS,
  SAVED_VARIABLES_NAME,
  SAVED_VARIABLES_VERSION,
} from "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-constants/selector-constants.module.code.ts"
import type {
  PackKeybind,
  SavedVariablesData,
  SelectedPackRef,
} from "akasha/temper/addon/pages/temper-core/temper-selector/modules/selector-types/selector-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

function buildDefaults(): SavedVariablesData {
  const packKeybinds: PackKeybind[] = []
  for (let i = 0; i < MAX_ADDON_LOAD_PACK_KEYBINDS; i++) {
    packKeybinds.push({})
  }
  return {
    addonPacks: {},
    addonPacksOfChar: {},
    autoReloadUI: false,
    showGlobalPacks: true,
    showGroupedByCharacterName: false,
    saveGroupedByCharacterName: false,
    selectedPackNameForCharacters: {},
    packKeybinds,
    packChangedBeforeReloadUI: false,
  }
}

let savedVars: SavedVariablesData | undefined

export function initializeSavedVariables(): undefined {
  savedVars = ZO_SavedVars.NewAccountWide<SavedVariablesData>(
    SAVED_VARIABLES_NAME,
    SAVED_VARIABLES_VERSION,
    undefined,
    buildDefaults()
  )
}

export function getSavedVariables(): SavedVariablesData {
  if (savedVars === undefined) {
    throw new Error("Add-on selector SavedVariables not initialized")
  }
  return savedVars
}

export function getCurrentCharId(): string {
  return tostring(GetCurrentCharacterId())
}

export function getCurrentCharName(): string {
  return zo_strformat("<<1>>", GetUnitName("player"))
}

export function getCurrentSelectedPack(): SelectedPackRef | undefined {
  return getSavedVariables().selectedPackNameForCharacters[getCurrentCharId()]
}

export function setCurrentSelectedPack(packName: string, charName: string): undefined {
  if (packName === "") {
    return
  }
  getSavedVariables().selectedPackNameForCharacters[getCurrentCharId()] = {
    packName,
    charName: charName === "" ? GLOBAL_PACK_NAME : charName,
    timestamp: GetTimeStamp(),
  }
}
