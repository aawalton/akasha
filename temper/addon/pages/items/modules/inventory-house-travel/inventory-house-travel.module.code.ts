import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import { placementStacksLeft } from "akasha/temper/addon/pages/items/modules/inventory-house-placement/inventory-house-placement.module.code.ts"
import {
  type CarriedFurnishing,
  type HouseStop,
  houseOfStorageVenue,
  houseStopSaid,
  houseStopsOf,
} from "akasha/temper/addon/pages/items/modules/inventory-house-stop/inventory-house-stop.module.code.ts"
import {
  circuitStep,
  startsAtStorage,
  surveyStops,
} from "akasha/temper/addon/pages/items/modules/inventory-house-travel/modules/inventory-house-circuit/inventory-house-circuit.module.code.ts"
import { planVenueSteps } from "akasha/temper/addon/pages/items/modules/inventory-plan/inventory-plan.module.code.ts"
import {
  forEachPendingAction,
  getCompiledConfig,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import { isPacedBankRunning } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-bank-paced/inventory-rules-dispatch-bank-paced.module.code.ts"
import type { AddonItemAction } from "akasha/temper/addon/pages/items/modules/inventory-rules-types/inventory-rules-types.module.code.ts"
import { getDatabase } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import { isPacingServerActions } from "akasha/temper/addon/pages/items/modules/inventory-server-action-window/inventory-server-action-window.module.code.ts"
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
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
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

const CIRCUIT_EVENTS = `${ADDON_NAME}_HouseCircuit`

const POLL_MS = 500

const SETTLE_MS = 4000

const ARRIVAL_MS = 90000

const JUMP = "RequestJumpToHouse"

interface Circuit {
  readonly id: number
  readonly label: string
  readonly stopsOf: (this: void) => readonly HouseStop[] | undefined
  readonly noneSaid: string
  readonly ported: number[]
  readonly passStorage: boolean
  readonly oneHop: boolean
  target: number | undefined
  waitingSaid: boolean
  combatSaid: boolean
}

let circuit: Circuit | undefined

let circuitsBegun = 0

function portTo(collectibleId: number): undefined {
  TemperHouses.PortToMyHousesById(GetCollectibleReferenceId(collectibleId), false)
}

function workLeft(): string | undefined {
  const left = placementStacksLeft()
  if (left !== undefined) return `placing finishes (${left} left)`
  if (isPacingServerActions() || isPacedBankRunning()) return "the storage moves finish"
  return undefined
}

function stopCircuit(): undefined {
  circuit = undefined
  EVENT_MANAGER.UnregisterForEvent(CIRCUIT_EVENTS, EVENT_PLAYER_ACTIVATED)
}

function endCircuit(text: string): undefined {
  const label = circuit?.label ?? "Circuit"
  stopCircuit()
  say(`${label}: ${text}`)
}

function liveCircuit(id: number): Circuit | undefined {
  return circuit !== undefined && circuit.id === id ? circuit : undefined
}

function waitedOut(run: Circuit): boolean {
  if (IsUnitInCombat("player")) {
    if (!run.combatSaid) say(`${run.label}: paused for combat`)
    run.combatSaid = true
    return false
  }
  if (run.combatSaid) say(`${run.label}: combat is over, going on`)
  run.combatSaid = false
  const work = workLeft()
  if (work === undefined) return true
  if (!run.waitingSaid) say(`${run.label}: porting on once ${work}`)
  run.waitingSaid = true
  return false
}

function portOn(run: Circuit, collectibleId: number, line: string): undefined {
  run.waitingSaid = false
  run.ported.push(collectibleId)
  say(line)
  if (run.oneHop) {
    stopCircuit()
    return portTo(collectibleId)
  }
  run.target = collectibleId
  const id = run.id
  zo_callLater(function (this: void): undefined {
    const late = liveCircuit(id)
    if (late === undefined || late.target !== collectibleId) return
    endCircuit(
      `stopped, the port to ${houseName(collectibleId)} did not happen; press again to go on`
    )
  }, ARRIVAL_MS)
  portTo(collectibleId)
}

function advance(id: number): undefined {
  const run = liveCircuit(id)
  if (run === undefined || run.target !== undefined) return
  if (!waitedOut(run)) {
    zo_callLater(() => advance(id), POLL_MS)
    return
  }
  const stops = run.stopsOf()
  if (stops === undefined) return endCircuit("stopped, no rules compiled — sync from Temper web")
  const step = circuitStep(stops, houseHere(), run.ported, run.passStorage)
  if (step.kind === "done") return endCircuit(run.ported.length === 0 ? run.noneSaid : "done")
  const name = houseName(step.stop.collectibleId)
  const work = houseStopSaid(step.stop.reason)
  if (step.kind === "repeat") {
    return endCircuit(`stopped, ${name} came up again (${work}), so its work did not finish`)
  }
  if (step.kind === "storage") {
    endCircuit(`stopping at ${name} for ${work}; press again there to go on`)
    return portTo(step.stop.collectibleId)
  }
  const line = `${run.label}: ${step.number} of ${step.total}, ${name}, ${work}`
  portOn(run, step.stop.collectibleId, line)
}

function arrived(id: number): undefined {
  const run = liveCircuit(id)
  if (run === undefined || run.target === undefined) return
  const target = run.target
  run.target = undefined
  if (houseHere() !== target) {
    return endCircuit(`stopped, the port to ${houseName(target)} landed somewhere else`)
  }
  zo_callLater(() => advance(id), SETTLE_MS)
}

function beginCircuit(
  label: string,
  stopsOf: (this: void) => readonly HouseStop[] | undefined,
  noneSaid: string
): undefined {
  const stops = stopsOf()
  if (stops === undefined) return say(`${label}: no rules compiled — sync from Temper web`)
  circuitsBegun += 1
  const id = circuitsBegun
  const oneHop = IsPrivateFunction(JUMP) || IsProtectedFunction(JUMP)
  circuit = {
    id,
    label,
    stopsOf,
    noneSaid,
    ported: [],
    passStorage: startsAtStorage(stops, houseHere()),
    oneHop,
    target: undefined,
    waitingSaid: false,
    combatSaid: false,
  }
  if (oneHop) say(`${label}: the game guards house ports, so each press ports once`)
  EVENT_MANAGER.RegisterForEvent(
    CIRCUIT_EVENTS,
    EVENT_PLAYER_ACTIVATED,
    function (this: void): undefined {
      arrived(id)
    }
  )
  advance(id)
}

export function travelToNextInventoryHouse(this: void): undefined {
  if (circuit !== undefined) return endCircuit("cancelled")
  beginCircuit("Circuit", houseStopsNow, "no house stop left in the plan")
}

function ownedHouses(): number[] {
  if (TemperHouses.GetNumPurchasedHouses() === 0) TemperHouses.CreateHouseList()
  const owned: number[] = []
  for (const key of Object.keys(TemperHouses.purchasedHouses)) {
    const houseId = tonumber(key)
    if (houseId !== undefined) owned.push(GetCollectibleIdForHouse(houseId))
  }
  return owned
}

function surveyStopsNow(): readonly HouseStop[] {
  const locations = getDatabase().locations
  return surveyStops(
    ownedHouses(),
    (collectibleId) => houseLocationKeyFor(collectibleId, locations) !== undefined
  )
}

export function surveyOwnedHouses(this: void): undefined {
  if (circuit !== undefined) return endCircuit("cancelled")
  beginCircuit("House scan", surveyStopsNow, "every house you own is scanned already")
}
