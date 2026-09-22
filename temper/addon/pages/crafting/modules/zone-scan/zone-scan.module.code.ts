import {
  asSavedVarsTable,
  asZoneDataEntry,
} from "akasha/temper/addon/pages/crafting/modules/zone-casts/zone-casts.module.code.ts"
import {
  addDebugInfoSubTable,
  checkMaxZoneIndicesAndIds,
} from "akasha/temper/addon/pages/crafting/modules/zone-internal-helpers/zone-internal-helpers.module.code.ts"
import { INTERNAL_STATE } from "akasha/temper/addon/pages/crafting/modules/zone-internal-state/zone-internal-state.module.code.ts"
import { lib } from "akasha/temper/addon/pages/crafting/modules/zone-lib-state/zone-lib-state.module.code.ts"
import type {
  Lib,
  SavedVarsTable,
  ZoneDataEntry,
} from "akasha/temper/addon/pages/crafting/modules/zone-types/zone-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function initZoneScan(this: void): undefined {
  lib.GetAllZoneDataById = function (
    this: Lib,
    reBuildNew?: boolean,
    doReloadUI?: boolean
  ): undefined {
    const rebuild = reBuildNew ?? false
    const reloadUI = doReloadUI ?? false

    const lang = lib.currentClientLanguage
    checkMaxZoneIndicesAndIds()
    const maxZoneIndices = lib.maxZoneIndices
    assert(
      maxZoneIndices !== undefined,
      `['${lib.libraryInfo.name}':GetAllZoneDataById]Error: Missing maxZoneIndices!`
    )[0]

    const zoneData = lib.zoneData
    const rawSV = lib.localizedZoneData[lang]
    let localizedZoneDataSV = rawSV === undefined ? undefined : asSavedVarsTable(rawSV)
    const preloadedZoneNamesTable = lib.preloadedZoneNames[lang]
    const languageIsMissingInTotal = preloadedZoneNamesTable === undefined

    let addedAtLeastOne = false
    for (const zoneIndexOfZoneId of $range(0, maxZoneIndices)) {
      const zoneId = GetZoneId(zoneIndexOfZoneId)
      if (zoneIndexOfZoneId !== 1) {
        let wasCreatedNew = false
        if (
          languageIsMissingInTotal ||
          (preloadedZoneNamesTable !== undefined && preloadedZoneNamesTable[zoneId] === undefined)
        ) {
          const zoneName = GetZoneNameById(zoneId)
          if (zoneName !== "") {
            if (localizedZoneDataSV === undefined) {
              const fresh: SavedVarsTable = {}
              lib.localizedZoneData[lang] = fresh
              localizedZoneDataSV = fresh
            }
            localizedZoneDataSV[zoneId] = ZO_CachedStrFormat("<<C:1>>", zoneName)
            wasCreatedNew = true
          }
        } else {
          if (localizedZoneDataSV !== undefined && localizedZoneDataSV[zoneId] !== undefined) {
            localizedZoneDataSV[zoneId] = undefined
          }
        }

        if (rebuild || wasCreatedNew) {
          const existing = zoneData[zoneId]
          let zoneDataForId: ZoneDataEntry
          if (existing === undefined) {
            zoneDataForId = {}
            zoneData[zoneId] = zoneDataForId
          } else {
            zoneDataForId = asZoneDataEntry(existing)
          }
          if (zoneDataForId.zoneIndex === undefined) {
            zoneDataForId.zoneIndex = zoneIndexOfZoneId
          }
          if (zoneDataForId.parentZone === undefined) {
            zoneDataForId.parentZone = GetParentZoneId(zoneId)
          }
          addedAtLeastOne = true
        }
      }
    }

    INTERNAL_STATE.poiDataTable = undefined

    if (addedAtLeastOne) {
      const apiVersionTable = asSavedVarsTable(zoneData.__lastZoneCheckAPIVersion__ ?? {})
      zoneData.__lastZoneCheckAPIVersion__ = apiVersionTable
      const apiVersionForLang = asSavedVarsTable(apiVersionTable[lang] ?? {})
      apiVersionTable[lang] = apiVersionForLang
      addDebugInfoSubTable(apiVersionForLang)

      if (localizedZoneDataSV !== undefined) {
        addDebugInfoSubTable(localizedZoneDataSV)
      }

      if (reloadUI) ReloadUI("ingame")
    }
  }
}
