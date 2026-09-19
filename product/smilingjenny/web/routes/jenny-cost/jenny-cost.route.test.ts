import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { cost as costGroup } from "akasha/alan/harness/readout/group/pages/cost/cost.readout-group.ts"
import { surplus as surplusGroup } from "akasha/alan/harness/readout/group/pages/surplus/surplus.readout-group.ts"
import { upkeep as upkeepGroup } from "akasha/alan/harness/readout/group/pages/upkeep/upkeep.readout-group.ts"
import { readoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.ts"
import {
  colorIn,
  readingsDropped,
  rowsAsked,
  servingStore,
  storeGoes,
  type Tile,
  tileAt,
} from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.test-fixtures.ts"
import { RELAY_PATH } from "akasha/alan/harness/readout/modules/relay/readout-relay.module.code.ts"
import {
  type Relaying,
  relayingTo,
} from "akasha/alan/harness/readout/modules/relay/readout-relay.module.test-fixtures.ts"
import { surplusHours as surplusHoursScale } from "akasha/alan/harness/readout/scale/pages/surplus-hours.readout-scale.ts"
import { readoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.ts"
import { loader } from "akasha/product/smilingjenny/web/routes/jenny-cost/jenny-cost.route.code.ts"
import { action } from "akasha/product/smilingjenny/web/routes/jenny-readout-relay/jenny-readout-relay.route.code.ts"

const RING_CREDENTIAL = crypto.randomUUID()
const RELAY_SECRET = crypto.randomUUID()
const COST = "cost-multiplier"
const SURPLUS = "upkeep-surplus"
const PATH = "/api/cost"

process.env.SMILINGJENNY_RING_CREDENTIAL = RING_CREDENTIAL
process.env.READING_RELAY_SECRET = RELAY_SECRET

const TIERS = ["black", "red", "orange", "yellow", "green", "blue"]

const COST_ROW = {
  slug: COST,
  label: "Cost",
  place: 1,
  wireKey: "cost",
  groups: [`${readoutGroup.slug}/${costGroup.slug}`],
}

const SURPLUS_ROW = {
  slug: SURPLUS,
  label: "Surplus",
  unit: "hours",
  place: 2,
  scale: `${readoutScale.slug}/${surplusHoursScale.slug}`,
  wireKey: "surplus",
  groups: [`${readoutGroup.slug}/${upkeepGroup.slug}`, `${readoutGroup.slug}/${surplusGroup.slug}`],
}

const SCALE_ROW = {
  slug: "surplus-hours",
  blackAt: -12,
  redAt: -8,
  yellowAt: -4,
  greenAt: 0,
  blueAt: 4,
}

const ANSWERED: { readouts: readonly Record<string, unknown>[] } = {
  readouts: [COST_ROW, SURPLUS_ROW],
}

let store: ReturnType<typeof Bun.serve>
let server: ReturnType<typeof Bun.serve>
let origin: string
let tile: Tile
let carried: Relaying
let askedWith: Tile["askedWith"]
let drawn: Tile["drawn"]

beforeAll(() => {
  store = servingStore((asked) =>
    asked.pageTypeSlug === "readout" ? rowsAsked(ANSWERED.readouts, asked.where) : [SCALE_ROW]
  )
  server = Bun.serve({
    port: 0,
    fetch(request) {
      const { pathname } = new URL(request.url)
      if (pathname === RELAY_PATH) return action({ request } as never)
      if (pathname === PATH) return loader({ request } as never)
      return new Response("no such route", { status: 404 })
    },
  })
  origin = `http://localhost:${server.port}`
  tile = tileAt(origin, PATH, "cost", RING_CREDENTIAL)
  carried = relayingTo(origin, RELAY_SECRET)
  askedWith = tile.askedWith
  drawn = tile.drawn
})

afterAll(() => {
  server.stop()
  storeGoes(store)
})

beforeEach(() => {
  readingsDropped()
  ANSWERED.readouts = [COST_ROW, SURPLUS_ROW]
})

const carryNow = async (multiplier: number, hours: number): Promise<undefined> => {
  await carried(COST, multiplier)
  await carried(SURPLUS, hours)
  return undefined
}

test("a caller holding no ring credential is refused", async () => {
  await carryNow(0.5, 5)
  expect((await askedWith(null)).status).toBe(401)
  expect((await askedWith(crypto.randomUUID())).status).toBe(401)
})

test("the widget's body is a non-empty list under `stoplights`", async () => {
  await carryNow(0.5, 5)
  const stoplights = await drawn()
  expect(Array.isArray(stoplights)).toBe(true)
  expect(stoplights.length).toBeGreaterThan(0)
})

test("nothing carried in shows an empty ring rather than a cost of zero", async () => {
  const [one] = await drawn()
  expect(one?.readingHeld).toBe("none")
  expect(one?.reading).toBe("")
  expect(one?.tier).toBe("black")
  expect(one?.label).toBe("Cost")
})

test("the cost is colored with the surplus carried in beside it", async () => {
  await carryNow(0.5, 5)
  expect((await drawn())[0]?.tier).toBe("yellow")
  readingsDropped()
  await carryNow(0.5, -5)
  expect((await drawn())[0]?.tier).toBe("red")
})

test("a cost above two multipliers is black whatever the surplus is", async () => {
  await carryNow(32, 20)
  expect((await drawn())[0]?.tier).toBe("black")
})

test("a cost of nothing over four hours of surplus is blue", async () => {
  await carryNow(0, 5)
  expect((await drawn())[0]?.tier).toBe("blue")
})

test("a cost of nothing beneath eight hours of debt is black", async () => {
  await carryNow(0, -20)
  expect((await drawn())[0]?.tier).toBe("black")
})

test("every stoplight carries a tier that is one of the six colors the phone decodes", async () => {
  for (const multiplier of [0, 0.5, 1, 1.5, 32]) {
    readingsDropped()
    await carryNow(multiplier, 5)
    for (const one of await drawn()) {
      expect(TIERS).toContain(colorIn(one, "tier"))
    }
  }
})

test("the label and the key are read off the readout's page rather than named in the route", async () => {
  await carryNow(0.5, 5)
  const [one] = await drawn()
  expect(one?.label).toBe("Cost")
  expect(one?.habit).toBe("cost")

  ANSWERED.readouts = [{ ...COST_ROW, label: "What it costs" }, SURPLUS_ROW]
  expect((await drawn())[0]?.label).toBe("What it costs")
})

test("the reading is a string, which is what the widget decodes", async () => {
  await carryNow(0.5, 5)
  expect(typeof (await drawn())[0]?.reading).toBe("string")
})

test("a cost taken long ago keeps what it holds on the ring", async () => {
  await carried(COST, 0.5, new Date(Date.now() - 46 * 60_000))
  await carried(SURPLUS, 5)
  const [one] = await drawn()
  expect(one?.readingHeld).toBeUndefined()
  expect(one?.reading).toBe("0.5")
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  await carryNow(0.5, 5)
  expect((await tile.answer()).headers.get("Cache-Control")).toBe("no-store")
  readingsDropped()
  expect((await tile.answer()).headers.get("Cache-Control")).toBe("no-store")
})
