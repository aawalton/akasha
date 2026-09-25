import {
  asNumber,
  asNumberOpt,
  asNumRecordOpt,
  asPresent,
  asString,
  asStringArray,
  asStringOpt,
  asUnknownArray,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import {
  asAnyNotNilTable,
  asEquipBoolTable,
  asFavoritesAccessor,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-casts/sets-tip-casts.module.code.ts"
import {
  MONSTER_SET_TYPE_TO_NO_VETERAN_STR,
  MONSTER_SET_TYPE_TO_VETERAN_STR,
  SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR,
  undauntedChestIdNames,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-header/sets-tip-header.module.code.ts"
import { getSetReconstructionCost } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-item-link/sets-tip-item-link.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-state/sets-tip-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-globals/sets-search-ui-globals.type-declaration.d.ts"
import {
  SETS_SETTYPE_CRAFTED,
  SETS_SETTYPE_MONSTER,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-settype-ids/sets-const-settype-ids.module.code.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const SET_TYPE_TO_TEXTURE = lib.setTypeToTexture
const undauntedChestTexture = asString(SET_TYPE_TO_TEXTURE["undaunted chest"])
const vetDungTexture = asString(SET_TYPE_TO_TEXTURE["vet_dung"])

function isLineBreakAtEnd(this: void, str: string | undefined): boolean {
  if (str === undefined || str === "") {
    return false
  }
  const endOfStr = string.sub(str, -2)
  return endOfStr !== undefined && endOfStr !== "" && endOfStr === "\n"
}

const IS_SPECIAL_CHAR: { [ch: string]: boolean } = {
  "[": true,
  "(": true,
  ")": true,
  "]": true,
}

export function addLineBreakIfNotEmpty(
  this: void,
  str: string | undefined,
  nextChar?: string,
  customSetStringPart?: string
): string | undefined {
  if (
    str !== undefined &&
    str !== "" &&
    isLineBreakAtEnd(str) === false &&
    (nextChar === undefined || (nextChar !== undefined && !IS_SPECIAL_CHAR[nextChar])) &&
    (customSetStringPart === undefined ||
      (customSetStringPart !== undefined &&
        customSetStringPart !== STATE.lastPlaceHolderInCustomTooltip))
  ) {
    str = str + "\n"
  }
  return str
}

export function checkTraitsNeededGiven(this: void, setData: { [key: string]: unknown }): boolean {
  const setType = asNumberOpt(setData["setType"])
  return (
    setType !== undefined &&
    setData["traitsNeeded"] !== undefined &&
    setType === SETS_SETTYPE_CRAFTED
  )
}

export function tableContentsAreAllTheSame(this: void, tabToCheck: object): boolean {
  if (ZO_IsTableEmpty(tabToCheck)) {
    return false
  }
  const entriesChecked = new LuaMap<AnyNotNil, boolean>()
  for (const [, entry] of pairs(asAnyNotNilTable(tabToCheck))) {
    entriesChecked.set(entry, true)
  }
  if (NonContiguousCount(entriesChecked) === 1) {
    return true
  }
  return false
}

export function buildSetNeededTraitsInfo(
  this: void,
  setData: { [key: string]: unknown }
): string | undefined {
  if (!checkTraitsNeededGiven(setData)) {
    return undefined
  }
  const traitsNeeded = tostring(setData["traitsNeeded"])
  if (traitsNeeded === "") {
    return undefined
  }
  return tostring(traitsNeeded)
}

export function addNonVeteranUndauntedChestName(
  this: void,
  setType: number | undefined,
  undauntedChestId: number | undefined,
  buildTextures?: boolean
): string {
  if (setType === undefined || undauntedChestId === undefined || undauntedChestId <= 0) {
    return ""
  }
  const buildTexturesResolved = buildTextures ?? false
  if (setType === SETS_SETTYPE_MONSTER) {
    const undauntedChestName = asPresent(undauntedChestIdNames[undauntedChestId])
    let undauntedChestTextureAndName: string
    if (STATE.tooltipTextures === true || buildTexturesResolved === true) {
      undauntedChestTextureAndName = zo_iconTextFormatNoSpace(
        undauntedChestTexture,
        24,
        24,
        undauntedChestName,
        undefined
      )
    } else {
      undauntedChestTextureAndName = undauntedChestName
    }
    if (undauntedChestTextureAndName === "") {
      return ""
    }
    return " (" + undauntedChestTextureAndName + ")"
  }
  return ""
}

function veteranStrOf(this: void, setType: number | undefined): unknown {
  if (setType === undefined) {
    return undefined
  }
  return MONSTER_SET_TYPE_TO_VETERAN_STR[setType] ?? SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR[setType]
}

function nonVeteranStrOf(this: void, setType: number | undefined): string | undefined {
  if (setType === undefined) {
    return undefined
  }
  return (
    MONSTER_SET_TYPE_TO_NO_VETERAN_STR[setType] ??
    asStringOpt(SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR[setType])
  )
}

export function getDungeonDifficultyStr(
  this: void,
  setData: { [key: string]: unknown },
  itemLink: string | undefined,
  buildTextures?: boolean
): LuaMultiReturn<[unknown, boolean]> {
  const buildTexturesResolved = buildTextures ?? false
  const veteranData = setData["veteran"]
  const setType = asNumberOpt(setData["setType"])
  if (veteranData !== undefined) {
    if (type(veteranData) === "table") {
      const equipType = GetItemLinkEquipType(itemLink)
      if (equipType !== undefined) {
        const isVeteran = asEquipBoolTable(veteranData)[equipType]
        if (isVeteran) {
          return $multi(veteranStrOf(setType), true)
        } else {
          let nonVeteranStr = nonVeteranStrOf(setType)
          if (setData["undauntedChestId"] !== undefined) {
            nonVeteranStr =
              asPresent(nonVeteranStr) +
              addNonVeteranUndauntedChestName(
                setType,
                asNumber(setData["undauntedChestId"]),
                buildTexturesResolved
              )
          }
          return $multi(nonVeteranStr, false)
        }
      }
    } else {
      if (!veteranData) {
        let nonVeteranStr = nonVeteranStrOf(setType)
        if (setData["undauntedChestId"] !== undefined) {
          nonVeteranStr =
            asPresent(nonVeteranStr) +
            addNonVeteranUndauntedChestName(
              setType,
              asNumber(setData["undauntedChestId"]),
              buildTexturesResolved
            )
        }
        return $multi(nonVeteranStr, false)
      } else {
        return $multi(veteranStrOf(setType), true)
      }
    }
  }
  return $multi(
    setType !== undefined ? SET_TYPE_TO_DROP_ZONE_LOCALIZATION_STR[setType] : undefined,
    false
  )
}

function concatenatedText(this: void, entry: unknown): string {
  if (typeof entry === "string") {
    return entry
  }
  if (typeof entry === "number") {
    return tostring(entry)
  }
  return error("TemperItemsCraftingSets: expected string or number, found " + type(entry), 2)
}

export function buildTextLinesFromTable(
  this: void,
  tableVar: { [idx: number]: unknown },
  prefixStr?: string,
  alwaysNewLine?: boolean,
  doSort?: boolean
): string {
  const entries = asUnknownArray(tableVar)
  const numEntries = entries.length
  if (numEntries === 0) {
    return ""
  }
  const alwaysNewLineResolved = alwaysNewLine ?? false
  const doSortResolved = doSort ?? false
  let retStrVar = ""
  if (numEntries >= 1) {
    if (doSortResolved) {
      table.sort(entries)
    }
    let entriesEmitted = 0
    for (const [, tableEntry] of ipairs(entries)) {
      if (tableEntry !== "") {
        if (entriesEmitted > 0) {
          retStrVar = retStrVar + (alwaysNewLineResolved ? "\n" : ", ")
        }
        retStrVar = retStrVar + concatenatedText(tableEntry)
        entriesEmitted = entriesEmitted + 1
      }
    }
  }
  return prefixStr !== undefined && prefixStr !== "" ? prefixStr + retStrVar : retStrVar
}

export function buildSetSearchFavoritesInfo(
  this: void,
  setData: { [key: string]: unknown }
): string | undefined {
  const setId = asNumberOpt(setData["setId"])
  if (setId === undefined) {
    return undefined
  }
  STATE.setsSearchUIShared = STATE.setsSearchUIShared ?? TemperItemsCraftingSets_SearchUI_Shared
  const shared = asFavoritesAccessor(asPresent(STATE.setsSearchUIShared))
  const setSearchFavoriteCategoriesOfSetId = asNumRecordOpt(
    shared.GetAllFavoritesCategories(shared, setId)
  )
  if (ZO_IsTableEmpty(setSearchFavoriteCategoriesOfSetId)) {
    return undefined
  }

  let result = ""
  const possible = lib.possibleSetSearchFavoriteCategoriesUnsorted
  for (const [, setSearchFavoriteCategory] of ipairs(
    asStringArray(setSearchFavoriteCategoriesOfSetId)
  )) {
    const texture = possible[setSearchFavoriteCategory]
    if (texture !== undefined && texture !== "") {
      if (result === "") {
        result = zo_iconFormat(texture, 24, 24)
      } else {
        result = result + " " + zo_iconFormat(texture, 24, 24)
      }
    }
  }
  return result
}

export function buildSetDLCInfo(
  this: void,
  setData: { [key: string]: unknown }
): string | undefined {
  const dlcId = asNumberOpt(setData["dlcId"])
  if (dlcId === undefined) {
    return undefined
  }
  return lib.GetDLCName(dlcId)
}

export function buildReconstructionCostInfo(
  this: void,
  setData: { [key: string]: unknown },
  itemLink: string | undefined,
  buildTextures?: boolean
): LuaMultiReturn<[string | undefined, string | undefined]> {
  const setId = asNumberOpt(setData["setId"])
  if (setId === undefined || itemLink === undefined) {
    return $multi(undefined, undefined)
  }
  const [cost, costClean] = getSetReconstructionCost(itemLink, setId, buildTextures)
  return $multi(cost, costClean)
}

function buildSetTypeInfo(
  this: void,
  setData: { setType?: number; setId?: number; classId?: number; [key: string]: unknown },
  buildTextures?: boolean
): LuaMultiReturn<[string, string | undefined]> {
  const buildTexturesResolved = buildTextures ?? false
  const setType = asNumberOpt(setData["setType"])
  if (setType === undefined) {
    return $multi(asPresent<string>(undefined), undefined)
  }
  const setTypeName = asPresent(lib.GetSetTypeName(setType))
  let setTypeTexture: string | undefined
  if (STATE.tooltipTextures === true || buildTexturesResolved === true) {
    if (setData["isVeteran"] !== undefined) {
      setTypeTexture = vetDungTexture
    } else {
      setTypeTexture = lib.GetSetTypeTexture(
        setType,
        asNumberOpt(setData["setId"]),
        asNumberOpt(setData["classId"])
      )
    }
  }
  return $multi(setTypeName, setTypeTexture)
}
lib.buildSetTypeInfo = buildSetTypeInfo

export function checkNonNeededLineBreak(
  this: void,
  patternNew: string,
  numberToCheck: number
): string {
  if (type(numberToCheck) !== "number") {
    return patternNew
  }
  const numberToCheckStr = tostring(numberToCheck)
  for (let num = 1; num <= 7; num++) {
    if (num !== numberToCheck) {
      const [adjacentMatchStart] = string.find(
        patternNew,
        "<<" + tostring(num) + ">><br><<" + numberToCheckStr + ">>"
      )
      if (adjacentMatchStart !== undefined) {
        patternNew = string.gsub(
          patternNew,
          "<<" + tostring(num) + ">><br>",
          "<<" + tostring(num) + ">>"
        )[0]
      }
    }
  }
  return patternNew
}
