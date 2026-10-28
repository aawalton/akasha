import { describe, expect, test } from "bun:test"
import {
  type CarriedFurnishing,
  type HouseRule,
  type HouseStopFacts,
  houseOfHouseBankKey,
  houseOfStorageVenue,
  houseStopSaid,
  houseStopsOf,
  type StorageStep,
  storageHouseOf,
} from "akasha/temper/addon/pages/items/modules/inventory-house-stop/inventory-house-stop.module.code.ts"

const VILLA = 5462
const GALLERY = 11172
const MANOR = 1094
const CAPSTONE = 1250

const LOCATIONS = {
  "HouseBank:5462:4678": { displayName: "Crown Items" },
  "HouseBank:5462:4676": { displayName: "Wealth" },
  "HouseBank:1094:4677": { displayName: "Spare" },
  Bank: { displayName: "Bank" },
  FurnitureVault: { displayName: "Furniture Vault" },
}

function houseRule(...houses: number[]): HouseRule {
  return {
    action: "move-to",
    destinationChain: [
      ...houses.map((house) => ({ destination: `house:${house}` as const })),
      { destination: "furniture-vault" as const },
    ],
  }
}

function factsOf(over: Partial<HouseStopFacts>): HouseStopFacts {
  return {
    storageSteps: [],
    houseOfVenue: (venue) => houseOfStorageVenue(venue, LOCATIONS),
    rules: [],
    scanned: () => true,
    carried: [],
    carriesHouses: true,
    ...over,
  }
}

function carried(collectibleId: number, units: number, slotIndex: number): CarriedFurnishing {
  return { collectibleId, units, slotIndex }
}

describe("A house chest's stop is the house its location key names.", () => {
  test("the house is the middle of a house chest's location key", () => {
    expect(houseOfHouseBankKey("HouseBank:5462:4678")).toBe(VILLA)
    expect(houseOfHouseBankKey("HouseBank:4678")).toBeUndefined()
    expect(houseOfHouseBankKey("Bank")).toBeUndefined()
  })

  test("a withdrawal and a deposit at a named chest go to that chest's house", () => {
    expect(houseOfStorageVenue("house-chest:HouseBank:1094:4677", LOCATIONS)).toBe(MANOR)
    expect(houseOfStorageVenue("house-storage:Spare", LOCATIONS)).toBe(MANOR)
    expect(houseOfStorageVenue("house-storage:Wealth", LOCATIONS)).toBe(VILLA)
  })

  test("a venue that is no storage has no house", () => {
    expect(houseOfStorageVenue("bank", LOCATIONS)).toBeUndefined()
    expect(houseOfStorageVenue("vendor", LOCATIONS)).toBeUndefined()
  })
})

describe("The vault's stop is the house holding the most house chests.", () => {
  test("the vault and an unnamed chest go to the house with the most chests", () => {
    expect(storageHouseOf(Object.keys(LOCATIONS))).toBe(VILLA)
    expect(houseOfStorageVenue("furniture-vault", LOCATIONS)).toBe(VILLA)
    expect(houseOfStorageVenue("house-storage", LOCATIONS)).toBe(VILLA)
  })

  test("a tie goes to the lower house id, and no chest means no house", () => {
    expect(storageHouseOf(["HouseBank:5462:1", "HouseBank:1094:2"])).toBe(MANOR)
    expect(storageHouseOf(["Bank"])).toBeUndefined()
  })
})

const VILLA_STEPS: StorageStep[] = [
  { venue: "bank", stacks: 4 },
  { venue: "house-chest:HouseBank:5462:4676", stacks: 3 },
  { venue: "furniture-vault", stacks: 2 },
]

describe("The houses to scan come first, since the vault sends nothing to an unscanned house.", () => {
  test("a scan comes before the Villa's chests and vault, and a placement after them", () => {
    const stops = houseStopsOf(
      factsOf({
        storageSteps: VILLA_STEPS,
        rules: [houseRule(GALLERY)],
        scanned: (house) => house !== GALLERY,
        carried: [carried(CAPSTONE, 1, 0)],
      })
    )
    expect(stops).toEqual([
      { collectibleId: GALLERY, reason: { kind: "scan" } },
      { collectibleId: VILLA, reason: { kind: "storage", chests: 3, vault: 2 } },
      { collectibleId: CAPSTONE, reason: { kind: "place", stacks: 1 } },
    ])
  })

  test("a house scanned on this visit drops out, so the next press goes to the Villa", () => {
    const scannedNow = new Set([VILLA])
    const facts = factsOf({
      storageSteps: VILLA_STEPS,
      rules: [houseRule(GALLERY)],
      scanned: (house) => scannedNow.has(house),
    })
    expect(houseStopsOf(facts)[0]?.collectibleId).toBe(GALLERY)
    scannedNow.add(GALLERY)
    expect(houseStopsOf(facts)[0]?.collectibleId).toBe(VILLA)
  })
})

describe("The storage stops come after the scans, in the order the plan's venues come.", () => {
  test("a chest in another house is a stop of its own, after the house the plan reached first", () => {
    const stops = houseStopsOf(
      factsOf({
        storageSteps: [
          { venue: "house-storage:Spare", stacks: 1 },
          { venue: "furniture-vault", stacks: 5 },
          { venue: "house-chest:HouseBank:5462:4678", stacks: 2 },
        ],
      })
    )
    expect(stops).toEqual([
      { collectibleId: MANOR, reason: { kind: "storage", chests: 1, vault: 0 } },
      { collectibleId: VILLA, reason: { kind: "storage", chests: 2, vault: 5 } },
    ])
  })
})

describe("The storage work at one house is one stop.", () => {
  test("the chests and the vault at the Villa are said together", () => {
    expect(houseStopSaid({ kind: "storage", chests: 3, vault: 2 })).toBe("chests 3, vault 2")
    expect(houseStopSaid({ kind: "storage", chests: 0, vault: 12 })).toBe("vault 12")
  })
})

describe("Each house a house rule names and no scan has recorded is a stop to scan.", () => {
  test("a scanned house and a rule naming no house are no scan", () => {
    const stops = houseStopsOf(
      factsOf({
        rules: [houseRule(VILLA, GALLERY), { action: "move-to", destinationChain: [] }],
        scanned: (house) => house === VILLA,
      })
    )
    expect(stops).toEqual([{ collectibleId: GALLERY, reason: { kind: "scan" } }])
    expect(houseStopSaid({ kind: "scan" })).toBe("scan")
  })

  test("a rule switched off or doing anything but move names no house to scan", () => {
    const off: HouseRule = { ...houseRule(GALLERY), active: false }
    const sell: HouseRule = { ...houseRule(MANOR), action: "sell" }
    expect(houseStopsOf(factsOf({ rules: [off, sell], scanned: () => false }))).toEqual([])
  })
})

describe("The houses to scan come in rule order, then in the order each chain names them.", () => {
  test("each house is named once, where it first comes", () => {
    const stops = houseStopsOf(
      factsOf({
        rules: [houseRule(GALLERY, MANOR), houseRule(CAPSTONE, GALLERY)],
        scanned: () => false,
      })
    )
    expect(stops.map((stop) => stop.collectibleId)).toEqual([GALLERY, MANOR, CAPSTONE])
  })
})

describe("A house the carried furnishings are bound for is a stop to place, after every storage stop.", () => {
  test("each house's stop counts the stacks carried for it", () => {
    const stops = houseStopsOf(
      factsOf({
        storageSteps: [{ venue: "furniture-vault", stacks: 2 }],
        rules: [houseRule(GALLERY)],
        scanned: (house) => house !== GALLERY,
        carried: [carried(MANOR, 1, 4), carried(MANOR, 3, 9), carried(MANOR, 1, 2)],
      })
    )
    expect(stops).toEqual([
      { collectibleId: GALLERY, reason: { kind: "scan" } },
      { collectibleId: VILLA, reason: { kind: "storage", chests: 0, vault: 2 } },
      { collectibleId: MANOR, reason: { kind: "place", stacks: 3 } },
    ])
    expect(houseStopSaid({ kind: "place", stacks: 7 })).toBe("place 7")
  })
})

describe("The houses to place in come in the order the smallest stacks reach them.", () => {
  test("the house taking the smallest stack comes first", () => {
    const stops = houseStopsOf(
      factsOf({
        carried: [carried(MANOR, 5, 0), carried(CAPSTONE, 2, 7), carried(MANOR, 1, 3)],
      })
    )
    expect(stops.map((stop) => stop.collectibleId)).toEqual([MANOR, CAPSTONE])
  })

  test("stacks of one size go by their slot", () => {
    const stops = houseStopsOf(
      factsOf({ carried: [carried(CAPSTONE, 1, 8), carried(MANOR, 1, 2)] })
    )
    expect(stops.map((stop) => stop.collectibleId)).toEqual([MANOR, CAPSTONE])
  })
})

describe("Only the storage carrier is sent to scan a house or to place furnishings.", () => {
  test("another character gets the storage stops alone", () => {
    const stops = houseStopsOf(
      factsOf({
        carriesHouses: false,
        storageSteps: [{ venue: "furniture-vault", stacks: 2 }],
        rules: [houseRule(GALLERY)],
        scanned: () => false,
        carried: [carried(MANOR, 1, 0)],
      })
    )
    expect(stops).toEqual([
      { collectibleId: VILLA, reason: { kind: "storage", chests: 0, vault: 2 } },
    ])
  })
})
