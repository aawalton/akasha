import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { answerCostAdmittedBy } from "akasha/alan/harness/cost/stoplight/cost-stoplight.module.code.ts"
import {
  rowsAsked,
  servingStore,
  storeGoes,
  type Tile,
  tileAt,
} from "akasha/alan/harness/readouts/group-serving/readout-group-serving.module.test-fixtures.ts"
import {
  dropRelayed,
  RELAY_PATH,
} from "akasha/alan/harness/readouts/relay/readout-relay.module.code.ts"
import {
  type Relaying,
  relayingTo,
} from "akasha/alan/harness/readouts/relay/readout-relay.module.test-fixtures.ts"
import { action } from "akasha/alan/web/routes/readout-relay/readout-relay.route.code.ts"

globalThis.Response = (await fetch("data:text/plain,")).constructor as typeof Response

const RELAY_SECRET = crypto.randomUUID()
const COST = "cost-multiplier"
const SURPLUS = "upkeep-surplus"
const PATH = "/api/cost"

process.env.READING_RELAY_SECRET = RELAY_SECRET

const TIERS = ["black", "red", "orange", "yellow", "green", "blue"]

const COST_ROW = {
  slug: COST,
  label: "Cost",
  place: 1,
  wireKey: "cost",
  groups: ["cost"],
}

const SURPLUS_ROW = {
  slug: SURPLUS,
  label: "Surplus",
  unit: "hours",
  place: 2,
  scale: "surplus-hours",
  wireKey: "surplus",
  groups: ["upkeep", "surplus"],
}

const SCALE_ROW = {
  slug: "surplus-hours",
  blackAt: -12,
  redAt: -8,
  yellowAt: -4,
  greenAt: 0,
  blueAt: 4,
}

const READOUTS: readonly Record<string, unknown>[] = [COST_ROW, SURPLUS_ROW]

let store: ReturnType<typeof Bun.serve>
let server: ReturnType<typeof Bun.serve>
let tile: Tile
let carried: Relaying

beforeAll(() => {
  store = servingStore((asked) =>
    asked.pageTypeSlug === "readout" ? rowsAsked(READOUTS, asked.where) : [SCALE_ROW]
  )
  server = Bun.serve({
    port: 0,
    fetch(request) {
      const { pathname } = new URL(request.url)
      if (pathname === RELAY_PATH) return action({ request } as never)
      if (pathname === PATH) return answerCostAdmittedBy(request, () => null)
      return new Response("no such route", { status: 404 })
    },
  })
  const origin = `http://localhost:${server.port}`
  tile = tileAt(origin, PATH, "cost")
  carried = relayingTo(origin, RELAY_SECRET)
})

afterAll(() => {
  server.stop()
  storeGoes(store)
})

beforeEach(() => {
  dropRelayed()
})

const carryNow = async (multiplier: number, hours: number): Promise<undefined> => {
  await carried(COST, multiplier)
  await carried(SURPLUS, hours)
  return undefined
}

test("the widget's body is a non-empty list under `stoplights`", async () => {
  await carryNow(0.5, 5)
  const stoplights = await tile.drawn()
  expect(Array.isArray(stoplights)).toBe(true)
  expect(stoplights.length).toBeGreaterThan(0)
})

test("nothing carried in shows an empty ring rather than a cost of zero", async () => {
  const [one] = await tile.drawn()
  expect(one?.readingHeld).toBe("none")
  expect(one?.reading).toBe("")
  expect(one?.tier).toBe("black")
  expect(one?.label).toBe("Cost")
})

test("a cost carried in is colored with the surplus carried in beside it", async () => {
  await carryNow(0.5, 5)
  const [one] = await tile.drawn()
  expect(one?.reading).toBe("0.5")
  expect(one?.tier).toBe("yellow")
})

test("the same cost against a green surplus is red rather than yellow", async () => {
  await carryNow(0.5, 1)
  expect((await tile.drawn())[0]?.tier).toBe("red")
})

test("every stoplight carries a tier that is one of the six colors the phone decodes", async () => {
  for (const multiplier of [0, 0.5, 1, 1.5, 32]) {
    dropRelayed()
    await carryNow(multiplier, 5)
    for (const one of await tile.drawn()) {
      expect(TIERS).toContain(String(one.tier))
    }
  }
})

test("the label and the key are read off the readout's page rather than named in the route", async () => {
  await carryNow(0.5, 5)
  const [one] = await tile.drawn()
  expect(one?.label).toBe("Cost")
  expect(one?.habit).toBe("cost")
})

test("the reading is a string, which is what the widget decodes", async () => {
  await carryNow(0.5, 5)
  expect(typeof (await tile.drawn())[0]?.reading).toBe("string")
})

test("a cost taken long ago keeps the cost it holds on the ring", async () => {
  await carried(COST, 0.5, new Date(Date.now() - 46 * 60_000))
  await carried(SURPLUS, 5)
  const [one] = await tile.drawn()
  expect(one?.readingHeld).toBeUndefined()
  expect(one?.reading).toBe("0.5")
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  await carryNow(0.5, 5)
  expect((await tile.answer()).headers.get("Cache-Control")).toBe("no-store")
})
