import { asIndexNumberMap } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import { asWayshrine2ZoneOpt } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts-tables/sets-core-casts-tables.module.code.ts"
import { safeReturnAPItable } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-helpers/sets-core-helpers.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import {
  SETS_TABLEKEY_WAYSHRINENODEID2ZONEID,
  SETS_TABLEKEY_WAYSHRINES,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

type Wayshrine2Zone = { [wayshrineNodeId: number]: number | undefined }
function getWayshrine2Zone(this: void): Wayshrine2Zone | undefined {
  return asWayshrine2ZoneOpt(lib.setDataPreloaded[SETS_TABLEKEY_WAYSHRINENODEID2ZONEID])
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
    if (wayshrine2zone === undefined) {
      return $multi(undefined, undefined)
    }
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
  const wayshrine2zone = getWayshrine2Zone()
  if (wayshrine2zone === undefined) {
    return undefined
  }
  return wayshrine2zone[wayshrineNodeId]
}
lib.GetWayshrinesZoneId = getWayshrinesZoneId
