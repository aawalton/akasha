import { asIndexNumberMap } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import { safeReturnAPItable } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-helpers/sets-core-helpers.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import { SETS_TABLEKEY_WAYSHRINES } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

type Wayshrine2Zone = { [wayshrineNodeId: number]: number | undefined }

let wayshrine2ZoneHeld: Wayshrine2Zone | undefined

function getWayshrine2Zone(this: void): Wayshrine2Zone {
  if (wayshrine2ZoneHeld !== undefined) {
    return wayshrine2ZoneHeld
  }
  const found: Wayshrine2Zone = {}
  for (let nodeIndex = 1; nodeIndex <= GetNumFastTravelNodes(); nodeIndex++) {
    const [zoneIndex] = GetFastTravelNodePOIIndicies(nodeIndex)
    const zoneId = GetZoneId(zoneIndex)
    if (zoneId > 0) {
      found[nodeIndex] = zoneId
    }
  }
  wayshrine2ZoneHeld = found
  return found
}

function getWayshrineIds(
  this: void,
  setId: number | undefined,
  withRelatedZoneIds?: boolean
): LuaMultiReturn<[unknown, Wayshrine2Zone | undefined]> {
  const withRelatedZoneIdsResolved = withRelatedZoneIds ?? false
  if (setId === undefined) {
    return $multi(undefined, undefined)
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return $multi(undefined, undefined)
  }
  const setInfo = lib.setInfo
  const setData = setInfo[setId]
  if (setData === undefined || setData[SETS_TABLEKEY_WAYSHRINES] === undefined) {
    return $multi(undefined, undefined)
  }
  let wayshrineNodsId2ZoneId: Wayshrine2Zone | undefined
  if (withRelatedZoneIdsResolved) {
    const wayshrine2zone = getWayshrine2Zone()
    wayshrineNodsId2ZoneId = {}
    const wayshrines = asIndexNumberMap(setData[SETS_TABLEKEY_WAYSHRINES])
    for (const [, wayshrineNodeId] of ipairs(wayshrines)) {
      wayshrineNodsId2ZoneId[wayshrineNodeId] = wayshrine2zone[wayshrineNodeId]
    }
  }
  return $multi(safeReturnAPItable(setData[SETS_TABLEKEY_WAYSHRINES]), wayshrineNodsId2ZoneId)
}
lib.GetWayshrineIds = getWayshrineIds

function getWayshrinesZoneId(this: void, wayshrineNodeId: number | undefined): number | undefined {
  if (wayshrineNodeId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  return getWayshrine2Zone()[wayshrineNodeId]
}
lib.GetWayshrinesZoneId = getWayshrinesZoneId
