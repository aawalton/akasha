import { TREASURE_DATA } from "akasha/temper/addon/pages/world/collections/modules/treasure-data/treasure-data.module.code.ts"
import {
  climbForTargets,
  nearestTarget,
  type PortTarget,
  portTargets,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-choose/quest-port-choose.module.code.ts"
import {
  beginTreasurePress,
  noteCandidates,
  noteMapStep,
  noteTreasure,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-trace/quest-port-trace.module.code.ts"
import {
  nodeReadings,
  onOverlandMap,
  portTo,
  say,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-travel/quest-port-travel.module.code.ts"
import {
  firstKnownTreasure,
  isTreasureItem,
  type MapFrame,
  reexpress,
  type Spot,
  type SpotRecord,
  spotsByItem,
  type TreasureSlot,
  universalDistance,
} from "akasha/temper/addon/pages/world/quest-port/modules/treasure-port-choose/treasure-port-choose.module.code.ts"
import { getSavedVars } from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-saved-vars/lost-treasure-saved-vars.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

ZO_CreateStringId("SI_BINDING_NAME_TEMPER_PORT_NEAR_TREASURE", "Port Near Treasure Or Survey")

let shippedSpots: SpotRecord[] | undefined

function shippedSpotRecords(this: void): SpotRecord[] {
  if (shippedSpots !== undefined) return shippedSpots
  const records: SpotRecord[] = []
  for (const [, pins] of pairs(TREASURE_DATA.MAP_ID_DATA)) {
    for (const pin of pins) {
      records.push({ itemId: pin.itemId, mapId: pin.mapId, x: pin.x, y: pin.y })
    }
  }
  shippedSpots = records
  return records
}

function minedSpotRecords(this: void): SpotRecord[] {
  const records: SpotRecord[] = []
  try {
    for (const [mapId, pins] of pairs(getSavedVars().mining.data)) {
      if (pins === undefined) continue
      for (const pin of pins) {
        records.push({ itemId: pin.itemId, mapId, x: pin.x, y: pin.y })
      }
    }
  } catch {
    return records
  }
  return records
}

function backpackTreasures(this: void): TreasureSlot[] {
  const slots: TreasureSlot[] = []
  const bagSize = GetBagSize(BAG_BACKPACK)
  for (let slotIndex = 0; slotIndex < bagSize; slotIndex++) {
    const [, specializedItemType] = GetItemType(BAG_BACKPACK, slotIndex)
    if (!isTreasureItem(specializedItemType)) continue
    slots.push({
      slotIndex,
      itemId: GetItemId(BAG_BACKPACK, slotIndex),
      specializedItemType,
      name: zo_strformat("<<1>>", GetItemName(BAG_BACKPACK, slotIndex)),
    })
  }
  return slots
}

function frameOf(this: void, mapId: number): MapFrame {
  const [offsetX, offsetY, width, height] = GetUniversallyNormalizedMapInfo(mapId)
  return { offsetX, offsetY, width, height }
}

interface Reached {
  readonly target: PortTarget
  readonly targets: readonly PortTarget[]
  readonly nodesRead: number
  readonly x: number
  readonly y: number
  readonly distance: number
}

function reachFrom(this: void, spot: Spot): Reached | undefined {
  const set = SetMapToMapId(spot.mapId)
  noteMapStep(`set-to-map ${String(spot.mapId)}`, set)
  if (set === SET_MAP_RESULT_FAILED) return undefined
  let frame = frameOf(spot.mapId)
  let x = spot.x
  let y = spot.y
  for (let climbs = 0; ; climbs++) {
    const nodes = nodeReadings()
    const targets = portTargets(nodes)
    const target = nearestTarget(targets, x, y)
    if (target !== undefined) {
      const distance = universalDistance(x, y, target.x, target.y, frame)
      return { target, targets, nodesRead: nodes.length, x, y, distance }
    }
    if (!climbForTargets(onOverlandMap(), climbs)) return undefined
    const zoomed = MapZoomOut()
    noteMapStep("zoom-out-for-targets", zoomed)
    if (zoomed === SET_MAP_RESULT_FAILED) return undefined
    const outer = frameOf(GetCurrentMapId())
    ;[x, y] = reexpress(x, y, frame, outer)
    frame = outer
  }
}

function nearestReach(this: void, spots: readonly Spot[]): Reached | undefined {
  let best: Reached | undefined
  for (const spot of spots) {
    const reached = reachFrom(spot)
    if (reached !== undefined && (best === undefined || reached.distance < best.distance)) {
      best = reached
    }
  }
  return best
}

export function portNearTreasure(this: void): undefined {
  beginTreasurePress()
  if (IsUnitInCombat("player")) return say("Porting waits until you are out of combat.")
  const spots = spotsByItem([...shippedSpotRecords(), ...minedSpotRecords()])
  const found = firstKnownTreasure(backpackTreasures(), spots)
  if (found === undefined) {
    return say("No treasure map or survey report in your backpack has a spot Temper knows.")
  }
  const { slot } = found
  noteTreasure(slot.slotIndex, slot.itemId, slot.name, found.spots)
  const reached = nearestReach(found.spots)
  if (reached !== undefined) {
    noteCandidates(reached.nodesRead, reached.targets, reached.x, reached.y, reached.target)
  }
  SetMapToPlayerLocation()
  if (reached === undefined) {
    return say(`No wayshrine you have found and no house you own is near ${slot.name}.`)
  }
  return portTo(reached.target, slot.name)
}
