import {
  asGeoDebugEntries,
  asSavedVarsTable,
  asZonePoiInfoTable,
} from "../zone-casts/zone-casts.module.code.ts"
import {
  addDebugInfoSubTable,
  checkMaxZoneIndicesAndIds,
  parseLuaCapture,
} from "../zone-internal-helpers/zone-internal-helpers.module.code.ts"
import { INTERNAL_STATE } from "../zone-internal-state/zone-internal-state.module.code.ts"
import { lib } from "../zone-lib-state/zone-lib-state.module.code.ts"
import type { Lib } from "../zone-types/zone-types.module.code.ts"

function populatePoiNameTable(this: void): undefined {
  const maxZoneIndices = lib.maxZoneIndices
  const poiNameDebugTable: Record<string, Record<number, number>> = {}
  for (const zoneIndexOfZoneId of $range(0, maxZoneIndices)) {
    const zoneId = GetZoneId(zoneIndexOfZoneId)
    const poiCount = GetNumPOIs(zoneIndexOfZoneId)
    if (poiCount > 0) {
      for (const poiIndex of $range(1, poiCount)) {
        const [poiNameRaw] = GetPOIInfo(zoneIndexOfZoneId, poiIndex)
        const [wayshrineMatchRaw] = string.match(poiNameRaw, lib.wayshrineString)
        const wayshrineMatch = parseLuaCapture(wayshrineMatchRaw)
        if (poiNameRaw !== "" && wayshrineMatch === undefined) {
          const poiName = string.lower(poiNameRaw)
          const poiInfo = poiNameDebugTable[poiName] ?? {}
          poiInfo[zoneId] = poiIndex
          poiNameDebugTable[poiName] = poiInfo
        }
      }
    }
  }
  INTERNAL_STATE.poiNameDebugTable = poiNameDebugTable
}

function getZonePoiData(this: void, zoneId: number): Record<number, string> | undefined {
  if (type(zoneId) !== "number") return undefined
  const zoneIndex = GetZoneIndex(zoneId)
  const poiCount = GetNumPOIs(zoneIndex)
  const poiInfo: Record<number, string> = {}
  if (poiCount > 0) {
    for (const poiIndex of $range(1, poiCount)) {
      const [poiName] = GetPOIInfo(zoneIndex, poiIndex)
      const [wayshrineMatchRaw] = string.match(poiName, lib.wayshrineString)
      const wayshrineMatch = parseLuaCapture(wayshrineMatchRaw)
      if (poiName !== "" && wayshrineMatch === undefined) {
        poiInfo[poiIndex] = poiName
      }
    }
  }
  return poiInfo
}

function addGeoData(
  this: void,
  zoneId: number,
  poiInfo: Record<number, number> | undefined,
  verified: boolean
): undefined {
  const geoDebugDataSV = lib.geoDebugData
  const info: Record<number, string> = {}

  if (verified) {
    const geoData = asGeoDebugEntries(geoDebugDataSV.verified ?? {})
    if (poiInfo !== undefined) {
      for (const [parentZoneId, poiIndex] of pairs(poiInfo)) {
        info[parentZoneId] =
          `${poiIndex} -- ${GetZoneNameById(zoneId)} --> ${GetZoneNameById(parentZoneId)}`
      }
    }
    geoData[zoneId] = info
    geoDebugDataSV.verified = geoData
  } else {
    const geoData = asGeoDebugEntries(geoDebugDataSV.unverified ?? {})
    const parentZoneId = GetParentZoneId(zoneId)
    info[parentZoneId] = `0 -- ${GetZoneNameById(zoneId)} --> ${GetZoneNameById(parentZoneId)}`
    geoData[zoneId] = info
    geoDebugDataSV.unverified = geoData

    const zonePoiInfo = asZonePoiInfoTable(geoDebugDataSV.zonePoiInfo ?? {})
    if (zonePoiInfo[parentZoneId] === undefined) {
      zonePoiInfo[parentZoneId] = getZonePoiData(parentZoneId)
      geoDebugDataSV.zonePoiInfo = zonePoiInfo
    }
  }
}

function getZonePoiInfo(this: void, zoneId: number): Record<number, number> | undefined {
  if (type(zoneId) !== "number") return undefined
  const zoneName = string.lower(GetZoneNameById(zoneId))
  const poiNameDebugTable = INTERNAL_STATE.poiNameDebugTable
  if (poiNameDebugTable === undefined) return undefined
  return poiNameDebugTable[zoneName]
}

function getUnknownZoneIds(this: void): number[] {
  const geoDebugDataSV = lib.geoDebugData
  const currentGeoData = lib.geoDataReferenceTable

  if (geoDebugDataSV.unverified !== undefined) {
    zo_mixin(currentGeoData, asGeoDebugEntries(geoDebugDataSV.unverified))
  }

  const maxZoneIndices = lib.maxZoneIndices
  const unKnownZoneIds: number[] = []
  for (const zoneIndexOfZoneId of $range(0, maxZoneIndices)) {
    const zoneId = GetZoneId(zoneIndexOfZoneId)
    if (zoneId > 2 && currentGeoData[zoneId] === undefined) {
      unKnownZoneIds.push(zoneId)
    }
  }

  return unKnownZoneIds
}

function loadDebugSavedVariables(this: void): undefined {
  if (lib.svDebugData === undefined) {
    lib.svDebugData = ZO_SavedVars.NewAccountWide(
      lib.libraryInfo.svDebugDataName,
      lib.libraryInfo.svVersion,
      undefined,
      {},
      GetWorldName(),
      "$AllAccounts"
    )
  }
}

export function initGeoDebug(this: void): undefined {
  lib.DebugInspectZonePoiInfo = function (this: Lib, zoneId: number): undefined {
    if (type(zoneId) !== "number") return undefined
    const zoneIndex = GetZoneIndex(zoneId)
    const poiCount = GetNumPOIs(zoneIndex)
    if (poiCount > 0) {
      for (const poiIndex of $range(1, poiCount)) {
        const [poiName] = GetPOIInfo(zoneIndex, poiIndex)
        const [wayshrineMatchRaw] = string.match(poiName, lib.wayshrineString)
        const wayshrineMatch = parseLuaCapture(wayshrineMatchRaw)
        if (poiName !== "" && wayshrineMatch === undefined) {
          d(string.format("-- poiIndex = %s, %s", poiIndex, poiName))
        }
      }
    }
  }

  lib.DebugClearGeoDataSv = function (this: Lib): undefined {
    lib.geoDebugData = {}
  }

  lib.DebugVerifyGeoData = function (this: Lib): undefined {
    const unKnownZoneIds = getUnknownZoneIds()
    if (unKnownZoneIds.length > 0) {
      populatePoiNameTable()
      for (const [, zoneId] of ipairs(unKnownZoneIds)) {
        const poiInfo = getZonePoiInfo(zoneId)
        addGeoData(zoneId, poiInfo, poiInfo !== undefined)
      }
    }
  }

  lib.DebugGetAllZoneDataNew = function (this: Lib, doReloadUI?: boolean): boolean | undefined {
    const reloadUI = doReloadUI ?? false

    const lang = lib.currentClientLanguage
    checkMaxZoneIndicesAndIds()
    const maxZoneIndices = lib.maxZoneIndices
    d(">=============================================>")
    d(
      `[${lib.libraryInfo.name}]DebugGetAllZoneDataNew, doReloadUI: ${tostring(reloadUI)}, lang: ${tostring(lang)}, maxZoneIndices: ${tostring(maxZoneIndices)}`
    )
    assert(
      maxZoneIndices !== undefined,
      `['${lib.libraryInfo.name}':DebugGetAllZoneDataNew]Error: Missing maxZoneIndices!`
    )[0]

    loadDebugSavedVariables()
    if (lib.svDebugData === undefined) return undefined
    const svDebugDataOfLang = asSavedVarsTable(lib.svDebugData[lang] ?? {})
    lib.svDebugData[lang] = svDebugDataOfLang

    let addedCounter = 0
    let countBefore = NonContiguousCount(svDebugDataOfLang)
    if (svDebugDataOfLang.__debugInfo__ !== undefined) countBefore = countBefore - 1
    if (countBefore < 0) countBefore = 0
    let loopCounter = 0

    for (const zoneIndexOfZoneId of $range(0, maxZoneIndices)) {
      loopCounter = loopCounter + 1
      const zoneId = GetZoneId(zoneIndexOfZoneId)
      if (zoneIndexOfZoneId !== 1) {
        const zoneName = GetZoneNameById(zoneId)
        if (zoneName !== "") {
          const formattedZoneName = ZO_CachedStrFormat("<<C:1>>", zoneName)
          if (svDebugDataOfLang[zoneId] !== formattedZoneName) {
            svDebugDataOfLang[zoneId] = formattedZoneName
            addedCounter = addedCounter + 1
            d(`> ZoneID ${tostring(zoneId)} added: '${tostring(formattedZoneName)}'`)
          }
        }
      }
    }

    let totalCount = NonContiguousCount(svDebugDataOfLang)
    if (svDebugDataOfLang.__debugInfo__ !== undefined) totalCount = totalCount - 1
    if (totalCount < 0) totalCount = 0

    if (addedCounter > 0) {
      addDebugInfoSubTable(svDebugDataOfLang)
      d(`>> ${tostring(loopCounter)} zoneIds checked:`)
      d(
        `>> Added ${tostring(addedCounter)} zoneIds to the SV table '${tostring(lib.libraryInfo.svDebugDataName)}[${tostring(lang)}]'`
      )
      d(
        `>>> Count of entries before: ${tostring(countBefore)} / Total count of entries now: ${tostring(totalCount)}`
      )
      d("<=============================================<")
      if (reloadUI) ReloadUI("ingame")
    } else {
      d(
        `<< ${tostring(loopCounter)} zoneIds checked: No new zoneId/name pairs found for language ${tostring(lang)}`
      )
      d(
        `<< Got ${tostring(countBefore)} zoneIds in the SV table '${tostring(lib.libraryInfo.svDebugDataName)}[${tostring(lang)}]'`
      )
      d("<=============================================<")
    }
  }
}
