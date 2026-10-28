import { describe, expect, test } from "bun:test"
import {
  type CarriedFurnishing,
  type HouseRule,
  type HouseStop,
  houseOfStorageVenue,
  houseStopsOf,
} from "akasha/temper/addon/pages/items/modules/inventory-house-stop/inventory-house-stop.module.code.ts"
import {
  type CircuitStep,
  circuitStep,
  startsAtStorage,
} from "akasha/temper/addon/pages/items/modules/inventory-house-travel/modules/inventory-house-circuit/inventory-house-circuit.module.code.ts"

const VILLA = 5462
const TOWER = 11172
const LIGHTHOUSE = 1250
const MANOR = 1094

const LOCATIONS = {
  "HouseBank:5462:4678": { displayName: "Crown Items" },
  FurnitureVault: { displayName: "Furniture Vault" },
}

function houseRule(...houses: number[]): HouseRule {
  return {
    action: "move-to",
    destinationChain: houses.map((house) => ({ destination: `house:${house}` as const })),
  }
}

interface World {
  readonly scanned: Set<number>
  carried: CarriedFurnishing[]
  vault: number
}

function stopsIn(world: World): readonly HouseStop[] {
  return houseStopsOf({
    storageSteps: world.vault > 0 ? [{ venue: "furniture-vault", stacks: world.vault }] : [],
    houseOfVenue: (venue) => houseOfStorageVenue(venue, LOCATIONS),
    rules: [houseRule(TOWER, LIGHTHOUSE, MANOR)],
    scanned: (house) => world.scanned.has(house),
    carried: world.carried,
    carriesHouses: true,
  })
}

function arrive(world: World, house: number, placing: boolean): undefined {
  world.scanned.add(house)
  if (placing) world.carried = world.carried.filter((one) => one.collectibleId !== house)
}

function run(world: World, start: number | undefined, placing = true): CircuitStep[] {
  const steps: CircuitStep[] = []
  const ported: number[] = []
  let here = start
  const passStorage = startsAtStorage(stopsIn(world), start)
  for (let guard = 0; guard < 20; guard++) {
    const step = circuitStep(stopsIn(world), here, ported, passStorage)
    steps.push(step)
    if (step.kind !== "port") return steps
    here = step.stop.collectibleId
    ported.push(here)
    arrive(world, here, placing)
  }
  return steps
}

function said(steps: readonly CircuitStep[]): string[] {
  return steps.map((step) =>
    step.kind === "port"
      ? `${step.number} of ${step.total} ${step.stop.collectibleId} ${step.stop.reason.kind}`
      : step.kind === "done"
        ? "done"
        : `${step.kind} ${step.stop.collectibleId}`
  )
}

describe("A circuit ports on to each house to scan or place in, one after another.", () => {
  test("the scans go in order, each counted against the scans left", () => {
    const world: World = { scanned: new Set([VILLA]), carried: [], vault: 0 }
    expect(said(run(world, undefined))).toEqual([
      `1 of 3 ${TOWER} scan`,
      `2 of 3 ${LIGHTHOUSE} scan`,
      `3 of 3 ${MANOR} scan`,
      "done",
    ])
  })
})

describe("A circuit ends at a storage stop, since the chests and the vault are opened by hand.", () => {
  test("the scans come first, the circuit stops at the Villa, and a press there goes on to place", () => {
    const world: World = {
      scanned: new Set([VILLA, MANOR]),
      carried: [{ collectibleId: MANOR, units: 2, slotIndex: 4 }],
      vault: 6,
    }
    expect(said(run(world, undefined))).toEqual([
      `1 of 2 ${TOWER} scan`,
      `2 of 2 ${LIGHTHOUSE} scan`,
      `storage ${VILLA}`,
    ])
    world.carried.push({ collectibleId: TOWER, units: 1, slotIndex: 9 })
    expect(said(run(world, VILLA))).toEqual([
      `1 of 2 ${TOWER} place`,
      `2 of 2 ${MANOR} place`,
      "done",
    ])
  })
})

describe("A circuit begun in a storage stop's house passes every storage stop.", () => {
  test("vault work the Villa still lists does not stop a circuit begun there", () => {
    const world: World = {
      scanned: new Set([TOWER, LIGHTHOUSE, MANOR]),
      carried: [{ collectibleId: LIGHTHOUSE, units: 1, slotIndex: 3 }],
      vault: 2,
    }
    expect(startsAtStorage(stopsIn(world), VILLA)).toBe(true)
    expect(startsAtStorage(stopsIn(world), TOWER)).toBe(false)
    expect(said(run(world, VILLA))).toEqual([`1 of 1 ${LIGHTHOUSE} place`, "done"])
    expect(said(run({ ...world, carried: [] }, TOWER))).toEqual([`storage ${VILLA}`])
  })
})

describe("A circuit's next stop is the first at a house other than the one the character is in.", () => {
  test("in the first stop's house the circuit goes to the one after, and past the last it is done", () => {
    const world: World = { scanned: new Set([VILLA, LIGHTHOUSE, MANOR]), carried: [], vault: 0 }
    expect(circuitStep(stopsIn(world), undefined, [], false)).toMatchObject({
      kind: "port",
      stop: { collectibleId: TOWER },
    })
    expect(circuitStep(stopsIn(world), TOWER, [], false)).toEqual({ kind: "done" })
  })
})

describe("A circuit ends where no house stop is left.", () => {
  test("a circuit with nothing to do is done at once", () => {
    const world: World = { scanned: new Set([TOWER, LIGHTHOUSE, MANOR]), carried: [], vault: 0 }
    expect(said(run(world, undefined))).toEqual(["done"])
  })
})

describe("A house the circuit already ported to coming up again stops the circuit.", () => {
  test("a placement that never ends brings its house back, and the circuit stops there", () => {
    const world: World = {
      scanned: new Set([TOWER, LIGHTHOUSE, MANOR]),
      carried: [
        { collectibleId: TOWER, units: 1, slotIndex: 1 },
        { collectibleId: MANOR, units: 2, slotIndex: 2 },
      ],
      vault: 0,
    }
    expect(said(run(world, undefined, false))).toEqual([
      `1 of 2 ${TOWER} place`,
      `2 of 2 ${MANOR} place`,
      `repeat ${TOWER}`,
    ])
  })
})

describe("A port is counted against the ports made and the stops left before the next storage stop.", () => {
  test("the stop the character is in is no port and is not counted", () => {
    const world: World = { scanned: new Set([VILLA]), carried: [], vault: 0 }
    const step = circuitStep(stopsIn(world), TOWER, [], false)
    expect(step).toEqual({
      kind: "port",
      stop: { collectibleId: LIGHTHOUSE, reason: { kind: "scan" } },
      number: 1,
      total: 2,
    })
  })
})
