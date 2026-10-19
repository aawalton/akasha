import type {
  NodeKind,
  NodeReading,
  PortTarget,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-choose/quest-port-choose.module.code.ts"
import {
  noteRecall,
  noteSaid,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-trace/quest-port-trace.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-3/eso-api-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function say(this: void, text: string): undefined {
  noteSaid(text)
  d(`[Temper] ${text}`)
  return undefined
}

function kindOf(this: void, poiType: number): NodeKind {
  if (poiType === POI_TYPE_WAYSHRINE) return "wayshrine"
  if (poiType === POI_TYPE_HOUSE) return "house"
  return "other"
}

export function nodeReadings(this: void): NodeReading[] {
  const readings: NodeReading[] = []
  const numNodes = GetNumFastTravelNodes()
  for (let nodeIndex = 1; nodeIndex <= numNodes; nodeIndex++) {
    const [known, name, x, y, , , poiType, shownOnMap, locked] = GetFastTravelNodeInfo(nodeIndex)
    const [outboundOnly] = GetFastTravelNodeOutboundOnlyInfo(nodeIndex)
    const kind = kindOf(poiType)
    const houseId = kind === "house" ? GetFastTravelNodeHouseId(nodeIndex) : 0
    const houseOwned = houseId > 0 && IsCollectibleUnlocked(GetCollectibleIdForHouse(houseId))
    readings.push({
      nodeIndex,
      name: zo_strformat("<<1>>", name),
      kind,
      known,
      shownOnMap,
      locked,
      outboundOnly,
      houseId,
      houseOwned,
      x,
      y,
    })
  }
  return readings
}

export function portTo(this: void, target: PortTarget, nearWhat: string): undefined {
  if (target.kind === "house") {
    say(`Porting outside ${target.name}, nearest to ${nearWhat}.`)
    RequestJumpToHouse(target.houseId, true)
    return undefined
  }
  if (GetInteractionType() !== INTERACTION_FAST_TRAVEL) {
    const [remain, blockedFor] = GetRecallCooldown()
    noteRecall({
      remain,
      blockedFor,
      cost: GetRecallCost(target.nodeIndex),
      money: GetCurrentMoney(),
    })
    if (blockedFor > 0) {
      say(
        `Recall is blocked for ${Math.ceil(blockedFor / 1000)}s, so ${target.name} is out of reach.`
      )
      return undefined
    }
    const cost = GetRecallCost(target.nodeIndex)
    if (cost > GetCurrentMoney()) {
      say(`Recall to ${target.name} costs ${cost} gold, more than you carry.`)
      return undefined
    }
  }
  say(
    target.kind === "instance"
      ? `Porting into ${target.name}, where ${nearWhat} is.`
      : `Porting to ${target.name}, nearest to ${nearWhat}.`
  )
  FastTravelToNode(target.nodeIndex)
  return undefined
}

export function onOverlandMap(this: void): boolean {
  return GetMapType() >= MAPTYPE_ZONE && GetMapContentType() !== MAP_CONTENT_DUNGEON
}
