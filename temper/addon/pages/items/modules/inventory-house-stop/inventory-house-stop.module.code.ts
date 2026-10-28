import { isAllDigits } from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"
import { chainHouses } from "akasha/temper/items/rules/core/modules/house-destination/house-destination.module.code.ts"
import { houseBankKeyFor } from "akasha/temper/items/rules/core/modules/house-storage-chest/house-storage-chest.module.code.ts"
import type { DestinationChain } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

const HOUSE_BANK_KEY_PREFIX = "HouseBank:"

const FURNITURE_VAULT_VENUE = "furniture-vault"

const HOUSE_STORAGE_VENUE = "house-storage"

const HOUSE_STORAGE_PREFIX = "house-storage:"

const HOUSE_CHEST_PREFIX = "house-chest:"

export type HouseStopReason =
  | { readonly kind: "storage"; readonly chests: number; readonly vault: number }
  | { readonly kind: "scan" }
  | { readonly kind: "place"; readonly stacks: number }

export interface HouseStop {
  readonly collectibleId: number
  readonly reason: HouseStopReason
}

export interface StorageStep {
  readonly venue: string
  readonly stacks: number
}

export interface HouseRule {
  readonly active?: boolean
  readonly action: string
  readonly destinationChain?: DestinationChain
}

export interface CarriedFurnishing {
  readonly collectibleId: number
  readonly units: number
  readonly slotIndex: number
}

export interface HouseStopFacts {
  readonly storageSteps: readonly StorageStep[]
  readonly houseOfVenue: (venue: string) => number | undefined
  readonly rules: readonly HouseRule[]
  readonly scanned: (collectibleId: number) => boolean
  readonly carried: readonly CarriedFurnishing[]
  readonly carriesHouses: boolean
}

type ChestLocations = Readonly<Record<string, { readonly displayName: string }>>

export function houseOfHouseBankKey(key: string): number | undefined {
  if (!key.startsWith(HOUSE_BANK_KEY_PREFIX)) return undefined
  const parts = key.split(":")
  const house = parts[1]
  if (parts.length !== 3 || house === undefined || !isAllDigits(house)) return undefined
  return Number(house)
}

export function storageHouseOf(keys: readonly string[]): number | undefined {
  const counts = new Map<number, number>()
  let best: number | undefined
  let bestCount = 0
  for (const key of keys) {
    const house = houseOfHouseBankKey(key)
    if (house === undefined) continue
    const count = (counts.get(house) ?? 0) + 1
    counts.set(house, count)
    if (count > bestCount || (count === bestCount && best !== undefined && house < best)) {
      best = house
      bestCount = count
    }
  }
  return best
}

export function isStorageVenue(venue: string): boolean {
  return (
    venue === FURNITURE_VAULT_VENUE ||
    venue === HOUSE_STORAGE_VENUE ||
    venue.startsWith(HOUSE_STORAGE_PREFIX) ||
    venue.startsWith(HOUSE_CHEST_PREFIX)
  )
}

export function houseOfStorageVenue(venue: string, locations: ChestLocations): number | undefined {
  if (!isStorageVenue(venue)) return undefined
  if (venue.startsWith(HOUSE_CHEST_PREFIX)) {
    return houseOfHouseBankKey(venue.slice(HOUSE_CHEST_PREFIX.length))
  }
  if (venue.startsWith(HOUSE_STORAGE_PREFIX)) {
    const key = houseBankKeyFor(venue, locations)
    const house = key === undefined ? undefined : houseOfHouseBankKey(key)
    if (house !== undefined) return house
  }
  return storageHouseOf(Object.keys(locations))
}

function storageStops(facts: HouseStopFacts): HouseStop[] {
  const order: number[] = []
  const tallies = new Map<number, { chests: number; vault: number }>()
  for (const step of facts.storageSteps) {
    if (step.stacks <= 0 || !isStorageVenue(step.venue)) continue
    const house = facts.houseOfVenue(step.venue)
    if (house === undefined) continue
    let tally = tallies.get(house)
    if (tally === undefined) {
      tally = { chests: 0, vault: 0 }
      tallies.set(house, tally)
      order.push(house)
    }
    if (step.venue === FURNITURE_VAULT_VENUE) {
      tally.vault += step.stacks
    } else {
      tally.chests += step.stacks
    }
  }
  const stops: HouseStop[] = []
  for (const house of order) {
    const tally = tallies.get(house)
    if (tally === undefined) continue
    stops.push({
      collectibleId: house,
      reason: { kind: "storage", chests: tally.chests, vault: tally.vault },
    })
  }
  return stops
}

function scanStops(facts: HouseStopFacts): HouseStop[] {
  const houses: number[] = []
  for (const rule of facts.rules) {
    if (rule.active === false || rule.action !== "move-to") continue
    for (const house of chainHouses(rule.destinationChain)) {
      if (facts.scanned(house) || houses.includes(house)) continue
      houses.push(house)
    }
  }
  return houses.map((house): HouseStop => ({ collectibleId: house, reason: { kind: "scan" } }))
}

function smallerFirst(one: CarriedFurnishing, two: CarriedFurnishing): number {
  if (one.units !== two.units) return one.units - two.units
  return one.slotIndex - two.slotIndex
}

function placeStops(facts: HouseStopFacts): HouseStop[] {
  const order: number[] = []
  const stacks = new Map<number, number>()
  for (const one of [...facts.carried].sort(smallerFirst)) {
    const held = stacks.get(one.collectibleId)
    if (held === undefined) order.push(one.collectibleId)
    stacks.set(one.collectibleId, (held ?? 0) + 1)
  }
  return order.map(
    (house): HouseStop => ({
      collectibleId: house,
      reason: { kind: "place", stacks: stacks.get(house) ?? 0 },
    })
  )
}

export function houseStopsOf(facts: HouseStopFacts): readonly HouseStop[] {
  const stops = storageStops(facts)
  if (!facts.carriesHouses) return stops
  return [...stops, ...scanStops(facts), ...placeStops(facts)]
}

export function nextHouseStop(
  stops: readonly HouseStop[],
  here: number | undefined
): HouseStop | undefined {
  return stops.find((stop) => stop.collectibleId !== here)
}

export function houseStopSaid(reason: HouseStopReason): string {
  if (reason.kind === "scan") return "scan"
  if (reason.kind === "place") return `place ${reason.stacks}`
  const parts: string[] = []
  if (reason.chests > 0) parts.push(`chests ${reason.chests}`)
  if (reason.vault > 0) parts.push(`vault ${reason.vault}`)
  return parts.join(", ")
}
