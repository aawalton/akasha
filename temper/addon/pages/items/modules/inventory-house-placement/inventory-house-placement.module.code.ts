import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import { getCompiledConfig } from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import { findMatchedRule } from "akasha/temper/addon/pages/items/modules/inventory-rules-eval/inventory-rules-eval.module.code.ts"
import { getDatabase } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import {
  noteServerAction,
  serverActionWaitMs,
} from "akasha/temper/addon/pages/items/modules/inventory-server-action-window/inventory-server-action-window.module.code.ts"
import {
  chainHouses,
  houseLocationKeyFor,
  houseRoomFor,
} from "akasha/temper/items/rules/core/modules/house-destination/house-destination.module.code.ts"
import { storageCarrierOf } from "akasha/temper/items/rules/routing/core/modules/inventory-consolidate-dest/inventory-consolidate-dest.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const PACE_MS = 500

interface Placement {
  readonly bagId: number
  readonly slotIndex: number
  readonly units: number
  readonly limitType: number
  readonly itemLink: string
}

interface Run {
  readonly houseId: number
  readonly name: string
  readonly queue: readonly Placement[]
  at: number
  started: boolean
  placed: number
  left: number
}

let running = false
let current: Run | undefined

export function placementStacksLeft(): number | undefined {
  if (!running || current === undefined) return undefined
  return current.queue.length - current.at
}

function isFurnishing(itemLink: string): boolean {
  const [itemType] = GetItemLinkItemType(itemLink)
  return itemType === ITEMTYPE_FURNISHING
}

function houseFor(
  houses: readonly number[],
  here: number,
  limitType: number,
  units: number
): number | undefined {
  const locations = getDatabase().locations
  for (const collectibleId of houses) {
    if (collectibleId === here) return here
    const key = houseLocationKeyFor(collectibleId, locations)
    const room = houseRoomFor(key === undefined ? undefined : locations[key], limitType)
    if (room !== undefined && room >= units) return collectibleId
  }
  return undefined
}

function placementsIn(bagId: number, here: number, out: Placement[]): undefined {
  const compiled = getCompiledConfig()
  if (compiled === undefined) return
  const size = GetBagSize(bagId)
  for (let slotIndex = 0; slotIndex < size; slotIndex++) {
    const [units] = GetSlotStackSize(bagId, slotIndex)
    if (units === 0) continue
    const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)
    if (itemLink === "" || !isFurnishing(itemLink)) continue
    const matched = findMatchedRule(bagId, slotIndex)
    if (matched === undefined || matched.action !== "move-to") continue
    if (matched.ruleSource !== "ordered-rule") continue
    const rule = compiled.orderedRules[matched.ruleIndex]
    const limitType = GetItemLinkFurnishingLimitType(itemLink)
    if (houseFor(chainHouses(rule?.destinationChain), here, limitType, units) !== here) continue
    out.push({ bagId, slotIndex, units, limitType, itemLink })
  }
}

function roomHere(houseId: number, limitType: number): number {
  return (
    GetHouseFurnishingPlacementLimit(houseId, limitType) - GetNumHouseFurnishingsPlaced(limitType)
  )
}

function finish(run: Run, why: string | undefined): undefined {
  running = false
  current = undefined
  const left = run.left + (run.queue.length - run.at)
  const said = `[${ADDON_NAME}] Placed ${run.placed} furnishing(s) in ${run.name}; ${left} stack(s) left`
  d(why === undefined ? said : `${said} — ${why}`)
}

function step(run: Run): undefined {
  const next = run.queue[run.at]
  if (next === undefined) return finish(run, undefined)
  const [units] = GetSlotStackSize(next.bagId, next.slotIndex)
  const same =
    units > 0 && GetItemLink(next.bagId, next.slotIndex, LINK_STYLE_BRACKETS) === next.itemLink
  const room = roomHere(run.houseId, next.limitType)
  if (!same || (!run.started && room < units)) {
    if (same) run.left += 1
    run.at += 1
    run.started = false
    zo_callLater(() => step(run), 0)
    return
  }
  if (room < 1) return finish(run, "the house is full")
  const wait = serverActionWaitMs()
  if (wait > 0) {
    zo_callLater(() => step(run), wait)
    return
  }
  const [x, y, z] = GetPlayerWorldPositionInHouse()
  noteServerAction()
  const result = HousingEditorRequestItemPlacement(next.bagId, next.slotIndex, x, y, z, 0, 0, 0)
  if (result !== HOUSING_REQUEST_RESULT_SUCCESS)
    return finish(run, `the game refused, result ${result}`)
  run.placed += 1
  run.started = units > 1
  if (!run.started) run.at += 1
  zo_callLater(() => step(run), PACE_MS)
}

export function placeFurnishingsHere(): undefined {
  if (running) return
  const houseId = GetCurrentZoneHouseId()
  if (houseId <= 0 || !IsOwnerOfCurrentHouse()) return
  const carrier = storageCarrierOf(getCompiledConfig()?.characterPriority)
  if (carrier !== undefined && carrier !== tostring(GetCurrentCharacterId())) return
  const here = GetCollectibleIdForHouse(houseId)
  const queue: Placement[] = []
  placementsIn(BAG_BACKPACK, here, queue)
  placementsIn(BAG_FURNITURE_VAULT, here, queue)
  if (queue.length === 0) return
  queue.sort((one, two) => one.units - two.units)
  running = true
  const name = zo_strformat("<<1>>", GetCollectibleName(here))
  const run: Run = { houseId, name, queue, at: 0, started: false, placed: 0, left: 0 }
  current = run
  step(run)
}
