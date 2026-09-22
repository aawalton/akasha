import { asPresent } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-casts/lib-sets-casts.module.code.ts"
import { asLibSlotVoidFns } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-sets/lib-sets.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-ui/eso-lib-sets-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-lib/lib-sets-lib.module.code.ts"

const gmidbzid = GetMapIndexByZoneId

function buildItemLink(
  this: void,
  itemId: number,
  itemQualitySubType?: number
): string | undefined {
  if (itemId === 0) {
    return undefined
  }
  const itemQuality = itemQualitySubType ?? 366
  return string.format(
    "|H1:item:%d:%d:50:0:0:0:0:0:0:0:0:0:0:0:0:%d:%d:0:0:%d:0|h|h",
    itemId,
    itemQuality,
    ITEMSTYLE_NONE,
    0,
    10000
  )
}
lib.buildItemLink = buildItemLink

function openMapOfZoneId(
  this: void,
  zoneId: number | undefined,
  isParentZoneId?: boolean
): boolean | undefined {
  if (zoneId === undefined) {
    return false
  }
  const isParentZoneIdResolved = isParentZoneId ?? false
  const mapIndex = gmidbzid(zoneId)
  if (mapIndex !== undefined) {
    const showWorldMap = asPresent(asLibSlotVoidFns(lib)["_showWorldMap"])
    showWorldMap()
    zo_callLater(() => {
      ZO_WorldMap_SetMapByIndex(mapIndex)
    }, 50)
  } else {
    if (isParentZoneIdResolved) {
      return undefined
    }
    const isDungeonZoneId = lib.IsDungeonZoneId
    const isDungeonZoneIdTrial = lib.IsDungeonZoneIdTrial
    const isPublicDungeonZoneId = lib.IsPublicDungeonZoneId
    if (
      isDungeonZoneId(zoneId) === true ||
      isDungeonZoneIdTrial(zoneId) === true ||
      isPublicDungeonZoneId(zoneId) === true
    ) {
      const parentZoneId = GetParentZoneId(zoneId)
      if (parentZoneId !== undefined && parentZoneId !== zoneId) {
        openMapOfZoneId(parentZoneId, true)
      }
    }
  }
  return undefined
}
lib.openMapOfZoneId = openMapOfZoneId

function showWayshrineNodeIdOnMap(
  this: void,
  wayshrineNodeId: number | undefined
): boolean | undefined {
  if (wayshrineNodeId === undefined) {
    return false
  }
  const zoneId = lib.GetWayshrinesZoneId(wayshrineNodeId)
  if (zoneId === undefined) {
    return undefined
  }
  openMapOfZoneId(zoneId)
  zo_callLater(() => {
    ZO_WorldMap_PanToWayshrine(wayshrineNodeId)
  }, 100)
  return undefined
}
lib.showWayshrineNodeIdOnMap = showWayshrineNodeIdOnMap
