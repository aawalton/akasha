import { listAddons } from "../selector-addon-manager/selector-addon-manager.module.code.ts"
import { GLOBAL_PACK_NAME } from "../selector-constants/selector-constants.module.code.ts"
import { isPackActive } from "../selector-packs-core/selector-packs-core.module.code.ts"
import {
  getCurrentCharId,
  getCurrentSelectedPack,
  getSavedVariables,
} from "../selector-saved-variables/selector-saved-variables.module.code.ts"
import { STRINGS } from "../selector-strings/selector-strings.module.code.ts"
import type { Pack } from "../selector-types/selector-types.module.code.ts"
import { getControls } from "../selector-ui-layout/selector-ui-layout.module.code.ts"

const SEARCH_STATE = { term: "", ordinal: -1 }

export function startAddonSearch(): undefined {
  SEARCH_STATE.term = ""
  SEARCH_STATE.ordinal = -1
  const controls = getControls()
  if (controls !== undefined) {
    controls.searchBox.SetText("")
    controls.searchBox.TakeFocus()
  }
  d(STRINGS.searchInstructions)
}

export function searchAddon(text: string): undefined {
  if (text === "") {
    SEARCH_STATE.term = ""
    SEARCH_STATE.ordinal = -1
    return
  }
  const needle = text.toLowerCase()
  if (needle !== SEARCH_STATE.term) {
    SEARCH_STATE.term = needle
    SEARCH_STATE.ordinal = -1
  }

  const listData = ZO_ScrollList_GetDataList(ZO_AddOnsList)
  if (listData === undefined) {
    return
  }

  const matchSortIndexes: number[] = []
  for (const entry of listData) {
    const data = entry.data
    if (data === undefined || data.sortIndex === undefined) {
      continue
    }
    if (rowMatches(data, needle)) {
      matchSortIndexes.push(data.sortIndex)
    }
  }
  if (matchSortIndexes.length === 0) {
    return
  }

  const nextOrdinal = (SEARCH_STATE.ordinal + 1) % matchSortIndexes.length
  SEARCH_STATE.ordinal = nextOrdinal
  const targetSortIndex = matchSortIndexes[nextOrdinal]
  if (targetSortIndex === undefined) {
    return
  }
  scrollToSortIndex(targetSortIndex)
}

function rowMatches(data: ZoAddOnRowData, needle: string): boolean {
  const fields = [data.addOnName, data.strippedAddOnName, data.addOnFileName]
  for (const field of fields) {
    if (field?.toLowerCase().includes(needle) === true) {
      return true
    }
  }
  return false
}

function scrollToSortIndex(sortIndex: number): undefined {
  const manager = ADD_ON_MANAGER_KEYBOARD
  if (manager === undefined || manager.list === undefined) {
    return
  }
  ZO_ScrollList_ScrollDataIntoView(manager.list, sortIndex, undefined, false)
}

export function showActivePackInChat(): undefined {
  const ref = getCurrentSelectedPack()
  if (ref === undefined || ref.packName === "") {
    d(STRINGS.noActivePack)
    return
  }
  const pack = lookupSelectedPack(ref.packName, ref.charName)
  if (pack === undefined || !isPackActive(pack, listAddons())) {
    d(STRINGS.noActivePack)
    return
  }
  d(formatActivePack(ref.packName))
}

function lookupSelectedPack(packName: string, charName: string): Pack | undefined {
  const sv = getSavedVariables()
  if (charName !== "" && charName !== GLOBAL_PACK_NAME) {
    const charStore = sv.addonPacksOfChar[getCurrentCharId()]
    if (charStore !== undefined && charStore[packName] !== undefined) {
      return charStore[packName]
    }
  }
  return sv.addonPacks[packName]
}

function formatActivePack(packName: string): string {
  return STRINGS.activePackTemplate.replace("%s", packName)
}
