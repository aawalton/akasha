import {
  asNumberArray,
  asNumberOpt,
  asStringOpt,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import {
  asLangNameIndexTableOpt,
  asNumIndexTableOpt,
  asUnknownRecordArray,
  asZoneIdGroupsOpt,
  asZoneMechanicGroupsOpt,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-casts/sets-tip-casts.module.code.ts"
import {
  BLACKLISTED_SET_IDS_FOR_ZONE_TOOLTIPS,
  langToUse,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-header/sets-tip-header.module.code.ts"
import { tableContentsAreAllTheSame } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-helpers/sets-tip-helpers.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-state/sets-tip-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import {
  SETS_TABLEKEY_DROPMECHANIC,
  SETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES,
  SETS_TABLEKEY_DROPMECHANIC_NAMES,
  SETS_TABLEKEY_DROPMECHANIC_SORTED,
  SETS_TABLEKEY_ZONEIDS,
  SETS_TABLEKEY_ZONEIDS_SORTED,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const doesClientLangEqualFallbackLang = lib.clientLang === lib.fallbackLang
const fallbackLang = lib.fallbackLang

export function getSetDropMechanicInfo(
  this: void,
  setData: { [key: string]: unknown },
  buildTextures?: boolean
): undefined {
  const buildTexturesResolved = buildTextures ?? false
  const scratch = STATE.scratch
  scratch.dropZoneNames = {}
  scratch.parentDropZoneNames = {}
  scratch.dropMechanicNames = {}
  scratch.dropMechanicNamesClean = {}
  scratch.dropLocationNames = {}
  scratch.dropZoneIdsTheSame = undefined
  scratch.dropMechanicTabTheSame = undefined

  const dropMechanicTab = asNumIndexTableOpt(setData[SETS_TABLEKEY_DROPMECHANIC])
  if (dropMechanicTab === undefined) {
    return
  }

  const dropZoneIds = asNumIndexTableOpt(setData[SETS_TABLEKEY_ZONEIDS])
  const dropMechanicNamesOfSet = asLangNameIndexTableOpt(setData[SETS_TABLEKEY_DROPMECHANIC_NAMES])
  const dropMechanicDropLocationNamesOfSet = asLangNameIndexTableOpt(
    setData[SETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES]
  )

  scratch.dropZoneIdsTheSame = asZoneIdGroupsOpt(setData[SETS_TABLEKEY_ZONEIDS_SORTED])
  scratch.dropMechanicTabTheSame = asZoneMechanicGroupsOpt(
    setData[SETS_TABLEKEY_DROPMECHANIC_SORTED]
  )

  function lGetDropMechanicName(
    this: void,
    pIdx: number,
    pDropMechanicIdOfZone: number
  ): string | undefined {
    const nameOfSet = dropMechanicNamesOfSet?.[pIdx]?.[langToUse]
    let lDropMechanicName: string | undefined
    if (nameOfSet === undefined) {
      lDropMechanicName =
        asStringOpt(scratch.dropMechanicNamesProcessed[pDropMechanicIdOfZone]) ??
        lib.getDropMechanicName(pDropMechanicIdOfZone, langToUse)[0]
    } else {
      lDropMechanicName = nameOfSet
    }
    scratch.dropMechanicNamesProcessed[pDropMechanicIdOfZone] = lDropMechanicName
    scratch.dropMechanicNamesClean[pIdx] = lDropMechanicName
    return lDropMechanicName
  }

  function lAddDropMechanicInfo(
    this: void,
    pIdx: number,
    pDropMechanicIdOfZone: number
  ): undefined {
    let dropMechanicNameOfZone = lGetDropMechanicName(pIdx, pDropMechanicIdOfZone)
    if (dropMechanicNameOfZone !== undefined) {
      if (STATE.tooltipTextures === true || buildTexturesResolved === true) {
        const dropMechanicTexture = lib.GetDropMechanicTexture(pDropMechanicIdOfZone)
        if (dropMechanicTexture !== undefined) {
          dropMechanicNameOfZone = zo_iconTextFormatNoSpace(
            dropMechanicTexture,
            24,
            24,
            dropMechanicNameOfZone,
            undefined
          )
        }
      }
      scratch.dropMechanicNames[pIdx] = dropMechanicNameOfZone
    }

    const dropLocationNamesOfIdx = dropMechanicDropLocationNamesOfSet?.[pIdx]
    if (dropLocationNamesOfIdx !== undefined) {
      let dropMechanicDropLocationNameOfZone = dropLocationNamesOfIdx[langToUse]
      if (
        (dropMechanicDropLocationNameOfZone === undefined ||
          dropMechanicDropLocationNameOfZone === "") &&
        !doesClientLangEqualFallbackLang
      ) {
        dropMechanicDropLocationNameOfZone = dropLocationNamesOfIdx[fallbackLang]
      }
      if (dropMechanicDropLocationNameOfZone !== undefined) {
        scratch.dropLocationNames[pIdx] = dropMechanicDropLocationNameOfZone
      }
    }
  }

  if (dropZoneIds === undefined) {
    const setId = asNumberOpt(setData["setId"])
    if (setId === undefined || !BLACKLISTED_SET_IDS_FOR_ZONE_TOOLTIPS[setId]) {
      d(
        lib.prefix + "ERROR getSetDropMechanicInfo - dropZoneIds MISSING! setId: " + tostring(setId)
      )
    } else {
      if (dropMechanicNamesOfSet !== undefined) {
        for (const [idx] of ipairs(asUnknownRecordArray(dropMechanicNamesOfSet))) {
          const dropMechanicId = dropMechanicTab[idx]
          if (dropMechanicId !== undefined) {
            lAddDropMechanicInfo(idx, dropMechanicId)
          }
        }
      }
    }
    return
  }

  const dropZoneIdList = asNumberArray(dropZoneIds)

  if (!STATE.useCustomTooltip) {
    const numDropZones = dropZoneIdList.length
    if (numDropZones > 1) {
      const allZonesTheSame = tableContentsAreAllTheSame(dropZoneIds) || false
      if (!allZonesTheSame) {
        let zoneIdsTheSame = scratch.dropZoneIdsTheSame
        if (zoneIdsTheSame === undefined) {
          const zoneIdsChecked = new LuaMap<number, boolean>()
          const sameTab: { [zoneId: number]: number[] } = {}
          for (const [idx, zoneId] of ipairs(dropZoneIdList)) {
            if (!zoneIdsChecked.get(zoneId)) {
              for (const [compareIdx, compareZoneId] of ipairs(dropZoneIdList)) {
                if (idx !== compareIdx) {
                  let sameGroup = sameTab[zoneId]
                  if (sameGroup === undefined) {
                    sameGroup = [idx]
                    sameTab[zoneId] = sameGroup
                  }
                  if (zoneId === compareZoneId) {
                    sameGroup.push(compareIdx)
                  }
                }
              }
              zoneIdsChecked.set(zoneId, true)
            }
          }
          zoneIdsTheSame = sameTab
          scratch.dropZoneIdsTheSame = sameTab
        }

        if (!ZO_IsTableEmpty(zoneIdsTheSame)) {
          setData[SETS_TABLEKEY_ZONEIDS_SORTED] = zoneIdsTheSame

          if (scratch.dropMechanicTabTheSame === undefined) {
            const tabTheSame: { [zoneId: number]: { [idx: number]: number } } = {}
            for (const [zoneId, dropIndices] of pairs(zoneIdsTheSame)) {
              for (const [, dropIndex] of ipairs(dropIndices)) {
                const dropMechanicIdOfZone = dropMechanicTab[dropIndex]
                if (dropMechanicIdOfZone !== undefined) {
                  let zoneTab = tabTheSame[zoneId]
                  if (zoneTab === undefined) {
                    zoneTab = {}
                    tabTheSame[zoneId] = zoneTab
                  }
                  zoneTab[dropIndex] = dropMechanicIdOfZone
                }
              }
            }
            if (ZO_IsTableEmpty(tabTheSame)) {
              scratch.dropMechanicTabTheSame = undefined
              scratch.dropZoneIdsTheSame = undefined
            } else {
              scratch.dropMechanicTabTheSame = tabTheSame
              setData[SETS_TABLEKEY_DROPMECHANIC_SORTED] = tabTheSame
            }
          }
        } else {
          scratch.dropZoneIdsTheSame = undefined
          scratch.dropMechanicTabTheSame = undefined
        }
      }
    }
  }

  for (const [idx, zoneId] of ipairs(dropZoneIdList)) {
    const isDungeon = lib.IsDungeonZoneId(zoneId)
    const isPublicDungeon = lib.IsPublicDungeonZoneId(zoneId)
    if (isDungeon === true || isPublicDungeon === true) {
      const parentZoneId = GetParentZoneId(zoneId)
      scratch.parentDropZoneNames[idx] =
        asStringOpt(scratch.zoneNamesProcessed[parentZoneId]) ?? lib.GetZoneName(parentZoneId)
    }

    const zoneName = asStringOpt(scratch.zoneNamesProcessed[zoneId]) ?? lib.GetZoneName(zoneId)
    scratch.dropZoneNames[idx] = zoneName
    scratch.zoneNamesProcessed[zoneId] = zoneName

    const dropMechanicIdOfZone = dropMechanicTab[idx]
    if (dropMechanicIdOfZone !== undefined) {
      lAddDropMechanicInfo(idx, dropMechanicIdOfZone)
    }
  }
}
