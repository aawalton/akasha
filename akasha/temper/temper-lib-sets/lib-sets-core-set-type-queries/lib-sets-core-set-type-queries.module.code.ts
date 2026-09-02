import { asPresent, asString } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asIndexNumberMapOpt,
  asLibSlots,
  asStrRecordEntryOpt,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import {
  asLangIndexStringMapOpt,
  asSetIdToStrRecordOpt,
} from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

function showWorldMap(this: void): undefined {
  if (!ZO_WorldMap_IsWorldMapShowing()) {
    if (IsInGamepadPreferredMode()) {
      SCENE_MANAGER.Push("gamepad_worldMap")
    } else {
      MAIN_MENU_KEYBOARD.ShowCategory(MENU_CATEGORY_MAP)
    }
  }
}
asLibSlots(lib)["_showWorldMap"] = showWorldMap

function getSetTypeSetsData(
  this: void,
  setType: number | undefined
): { [setId: number]: { [k: string]: unknown } } | false | undefined {
  if (setType === undefined) {
    return undefined
  }
  const allowedSetTypes = lib.allowedSetTypes
  const allowedSetType = allowedSetTypes[setType] ?? false
  if (!allowedSetType) {
    return undefined
  }
  const setTypes2SetIdsTable = lib.setTypeToSetIdsForSetTypeTable
  const setType2SetIdsTable = asSetIdToStrRecordOpt(setTypes2SetIdsTable[setType])
  if (setType2SetIdsTable === undefined) {
    return false
  }
  let setsDataForSetTypeTable: { [setId: number]: { [k: string]: unknown } } | undefined
  let cnt = 0
  for (const [setIdForSetType, setDataForSetType] of pairs(setType2SetIdsTable)) {
    setsDataForSetTypeTable = setsDataForSetTypeTable ?? {}
    setsDataForSetTypeTable[setIdForSetType] = setDataForSetType
    asPresent(setsDataForSetTypeTable[setIdForSetType])[LIBSETS_TABLEKEY_SETTYPE] = setType
    cnt = cnt + 1
  }
  if (cnt > 0) {
    return setsDataForSetTypeTable
  } else {
    return undefined
  }
}
asLibSlots(lib)["_getSetTypeSetsData"] = getSetTypeSetsData

type DropNamesByIdx = { [idx: number]: { [lang: string]: string | undefined } }
function getDropMechanicAndDropLocationNames(
  this: void,
  setId: number | undefined,
  langToUse?: string,
  setData?: { [key: string]: unknown }
): LuaMultiReturn<
  [DropNamesByIdx | undefined, DropNamesByIdx | undefined, DropNamesByIdx | undefined, unknown]
> {
  const supportedLanguages = lib.supportedLanguages
  const fallbackLang = lib.fallbackLang
  const noSetIdSets = lib.noSetIdSets
  const setInfo = lib.setInfo
  const getDropMechanicName = lib.getDropMechanicName
  const isNoESOSet = lib.IsNoESOSet

  let dropMechanicNamesTable: DropNamesByIdx | undefined
  let dropMechanicDropLocationNamesTable: DropNamesByIdx | undefined
  let dropMechanicTooltipsTable: DropNamesByIdx | undefined
  let langToUseResolved = langToUse
  let setDataResolved = setData
  if (setId === undefined && setDataResolved === undefined) {
    return $multi(undefined, undefined, undefined, setDataResolved)
  }
  if (setDataResolved === undefined) {
    const setIdPresent = asPresent(setId)
    const isNonEsoSetId = isNoESOSet(setIdPresent)
    if (isNonEsoSetId === true) {
      setDataResolved = asStrRecordEntryOpt(noSetIdSets[setIdPresent])
    } else {
      if (setInfo[setIdPresent] === undefined) {
        return $multi(undefined, undefined, undefined, undefined)
      }
      setDataResolved = asStrRecordEntryOpt(setInfo[setIdPresent])
    }
    if (setDataResolved === undefined) {
      return $multi(undefined, undefined, undefined, undefined)
    }
    setDataResolved["setId"] = setId
  }

  const dropMechanicTable = asIndexNumberMapOpt(setDataResolved[LIBSETS_TABLEKEY_DROPMECHANIC])
  if (dropMechanicTable !== undefined) {
    if (supportedLanguages !== undefined) {
      let supportedLanguageData: boolean | undefined
      const onlyOneLanguage = langToUseResolved !== undefined
      if (onlyOneLanguage) {
        supportedLanguageData = supportedLanguages[asPresent(langToUseResolved)]
        if (!supportedLanguageData && langToUseResolved !== fallbackLang) {
          langToUseResolved = fallbackLang
          supportedLanguageData = supportedLanguages[langToUseResolved]
        }
        if (!supportedLanguageData) {
          return $multi(undefined, undefined, undefined, setDataResolved)
        }
      }

      const dropMechanicProvidedDropLocationNames = asLangIndexStringMapOpt(
        setDataResolved[LIBSETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES]
      )

      for (const [idx, dropMechanic] of ipairs(dropMechanicTable)) {
        if (onlyOneLanguage) {
          const langToUsePresent = asPresent(langToUseResolved)
          dropMechanicNamesTable = dropMechanicNamesTable ?? {}
          dropMechanicNamesTable[idx] = dropMechanicNamesTable[idx] ?? {}
          dropMechanicTooltipsTable = dropMechanicTooltipsTable ?? {}
          dropMechanicTooltipsTable[idx] = dropMechanicTooltipsTable[idx] ?? {}
          const [nameForLang, tooltipForLang] = getDropMechanicName(dropMechanic, langToUsePresent)
          asPresent(dropMechanicNamesTable[idx])[langToUsePresent] = nameForLang
          asPresent(dropMechanicTooltipsTable[idx])[langToUsePresent] = tooltipForLang
          if (dropMechanicProvidedDropLocationNames !== undefined) {
            let langTouseForProvidedNames = langToUsePresent
            if (dropMechanicProvidedDropLocationNames[langTouseForProvidedNames] === undefined) {
              if (
                langToUsePresent !== fallbackLang &&
                dropMechanicProvidedDropLocationNames[fallbackLang] !== undefined
              ) {
                langTouseForProvidedNames = fallbackLang
              }
            }
            const providedForLang = dropMechanicProvidedDropLocationNames[langTouseForProvidedNames]
            if (
              providedForLang !== undefined &&
              providedForLang[idx] !== undefined &&
              providedForLang[idx] !== ""
            ) {
              dropMechanicDropLocationNamesTable = dropMechanicDropLocationNamesTable ?? {}
              dropMechanicDropLocationNamesTable[idx] =
                dropMechanicDropLocationNamesTable[idx] ?? {}
              asPresent(dropMechanicDropLocationNamesTable[idx])[langTouseForProvidedNames] =
                providedForLang[idx]
            }
          }
        } else {
          for (const [supportedLanguage, isSupported] of pairs(supportedLanguages)) {
            if (isSupported === true) {
              dropMechanicNamesTable = dropMechanicNamesTable ?? {}
              dropMechanicNamesTable[idx] = dropMechanicNamesTable[idx] ?? {}
              dropMechanicTooltipsTable = dropMechanicTooltipsTable ?? {}
              dropMechanicTooltipsTable[idx] = dropMechanicTooltipsTable[idx] ?? {}
              const [nameForLang, tooltipForLang] = getDropMechanicName(
                dropMechanic,
                asString(supportedLanguage)
              )
              asPresent(dropMechanicNamesTable[idx])[supportedLanguage] = nameForLang
              asPresent(dropMechanicTooltipsTable[idx])[supportedLanguage] = tooltipForLang
            }
          }
          if (dropMechanicProvidedDropLocationNames !== undefined) {
            for (const [supportedLanguage, isSupported] of pairs(supportedLanguages)) {
              if (isSupported === true) {
                const providedForLang = dropMechanicProvidedDropLocationNames[supportedLanguage]
                if (
                  providedForLang !== undefined &&
                  providedForLang[idx] !== undefined &&
                  providedForLang[idx] !== ""
                ) {
                  dropMechanicDropLocationNamesTable = dropMechanicDropLocationNamesTable ?? {}
                  dropMechanicDropLocationNamesTable[idx] =
                    dropMechanicDropLocationNamesTable[idx] ?? {}
                  asPresent(dropMechanicDropLocationNamesTable[idx])[supportedLanguage] =
                    providedForLang[idx]
                }
              }
            }
          }
        }
      }
    }
  }
  return $multi(
    dropMechanicNamesTable,
    dropMechanicDropLocationNamesTable,
    dropMechanicTooltipsTable,
    setDataResolved
  )
}
lib.GetDropMechanicAndDropLocationNames = getDropMechanicAndDropLocationNames
