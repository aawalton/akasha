import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import {
  type CarriedFurnishing,
  type HouseStop,
  houseOfStorageVenue,
  houseStopSaid,
  houseStopsOf,
  nextHouseStop,
} from "akasha/temper/addon/pages/items/modules/inventory-house-stop/inventory-house-stop.module.code.ts"
import { planVenueSteps } from "akasha/temper/addon/pages/items/modules/inventory-plan/inventory-plan.module.code.ts"
import {
  forEachPendingAction,
  getCompiledConfig,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import type { AddonItemAction } from "akasha/temper/addon/pages/items/modules/inventory-rules-types/inventory-rules-types.module.code.ts"
import { getDatabase } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import {
  houseLocationKeyFor,
  houseTarget,
} from "akasha/temper/items/rules/core/modules/house-destination/house-destination.module.code.ts"
import { storageCarrierOf } from "akasha/temper/items/rules/routing/core/modules/inventory-consolidate-dest/inventory-consolidate-dest.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/housing-publish-declarations/housing-publish-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

function say(text: string): undefined {
  d(`[${ADDON_NAME}] ${text}`)
}

function houseName(collectibleId: number): string {
  return zo_strformat("<<1>>", GetCollectibleName(collectibleId))
}

function houseHere(): number | undefined {
  const houseId = GetCurrentZoneHouseId()
  if (houseId <= 0 || !IsOwnerOfCurrentHouse()) return undefined
  return GetCollectibleIdForHouse(houseId)
}

function carriedFurnishings(): CarriedFurnishing[] {
  const carried: CarriedFurnishing[] = []
  forEachPendingAction(function (
    this: void,
    bagId: number,
    slotIndex: number,
    action: AddonItemAction,
    destination?: string
  ): undefined {
    if (bagId !== BAG_BACKPACK || action !== "move-to") return
    const collectibleId = houseTarget(destination)
    if (collectibleId === undefined) return
    const [units] = GetSlotStackSize(bagId, slotIndex)
    if (units > 0) carried.push({ collectibleId, units, slotIndex })
  })
  return carried
}

function houseStopsNow(): readonly HouseStop[] | undefined {
  const compiled = getCompiledConfig()
  const steps = planVenueSteps()
  if (compiled === undefined || steps === undefined) return undefined
  const locations = getDatabase().locations
  const carrier = storageCarrierOf(compiled.characterPriority)
  const stops = houseStopsOf({
    storageSteps: steps,
    houseOfVenue: (venue) => houseOfStorageVenue(venue, locations),
    rules: compiled.orderedRules,
    scanned: (collectibleId) => houseLocationKeyFor(collectibleId, locations) !== undefined,
    carried: carriedFurnishings(),
    carriesHouses: carrier === undefined || carrier === tostring(GetCurrentCharacterId()),
  })
  return stops.filter((stop) => IsCollectibleUnlocked(stop.collectibleId))
}

export function travelToNextInventoryHouse(this: void): undefined {
  if (IsUnitInCombat("player")) return say("Porting waits until you are out of combat.")
  const stops = houseStopsNow()
  if (stops === undefined) return say("Next house: no rules compiled — sync from Temper web")
  const here = houseHere()
  const stop = nextHouseStop(stops, here)
  if (stop === undefined) {
    return say(
      here !== undefined && stops.length > 0
        ? `Next house: no house stop left past ${houseName(here)}`
        : "Next house: no house stop left in the plan"
    )
  }
  say(`Porting to ${houseName(stop.collectibleId)}: ${houseStopSaid(stop.reason)}`)
  TemperHouses.PortToMyHousesById(GetCollectibleReferenceId(stop.collectibleId), false)
}
