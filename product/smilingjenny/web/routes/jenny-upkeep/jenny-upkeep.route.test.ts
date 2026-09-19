import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { cost as costGroup } from "akasha/alan/harness/readout/group/pages/cost/cost.readout-group.ts"
import { safety as safetyGroup } from "akasha/alan/harness/readout/group/pages/safety/safety.readout-group.ts"
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
import { capacityHours } from "akasha/alan/harness/readout/scale/pages/capacity-hours.readout-scale.ts"
import { safetyLevel } from "akasha/alan/harness/readout/scale/pages/safety-level.readout-scale.ts"
import { sleepHours } from "akasha/alan/harness/readout/scale/pages/sleep-hours.readout-scale.ts"
import { surplusHours } from "akasha/alan/harness/readout/scale/pages/surplus-hours.readout-scale.ts"
import { readoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.ts"
import { action } from "akasha/product/smilingjenny/web/routes/jenny-readout-relay/jenny-readout-relay.route.code.ts"
import { loader } from "akasha/product/smilingjenny/web/routes/jenny-upkeep/jenny-upkeep.route.code.ts"

const RING_CREDENTIAL = crypto.randomUUID()
const RELAY_SECRET = crypto.randomUUID()
const GROUP = upkeepGroup.slug
const GROUP_AT = `${readoutGroup.slug}/${GROUP}`
const PATH = "/api/upkeep"

process.env.SMILINGJENNY_RING_CREDENTIAL = RING_CREDENTIAL
process.env.READING_RELAY_SECRET = RELAY_SECRET

const TIERS = ["black", "red", "orange", "yellow", "green", "blue"]

const SAFETY = "upkeep-safety"
const SURPLUS = "upkeep-surplus"
const CAPACITY = "upkeep-capacity"
const SLEEP = "upkeep-sleep"

const SAFETY_ROW = {
  slug: SAFETY,
  label: "Safety",
  place: 1,
  scale: `${readoutScale.slug}/${safetyLevel.slug}`,
  wireKey: "safety",
  groups: [GROUP_AT, `${readoutGroup.slug}/${safetyGroup.slug}`],
}

const SURPLUS_ROW = {
  slug: SURPLUS,
  label: "Surplus",
  place: 2,
  scale: `${readoutScale.slug}/${surplusHours.slug}`,
  wireKey: "surplus",
  groups: [GROUP_AT, `${readoutGroup.slug}/${surplusGroup.slug}`],
}

const CAPACITY_ROW = {
  slug: CAPACITY,
  label: "Capacity",
  place: 3,
  scale: `${readoutScale.slug}/${capacityHours.slug}`,
  wireKey: "capacity",
  groups: [GROUP_AT],
}

const SLEEP_ROW = {
  slug: SLEEP,
  label: "Sleep",
  place: 6,
  scale: `${readoutScale.slug}/${sleepHours.slug}`,
  wireKey: "sleep",
  groups: [GROUP_AT],
}

const SCALE_ROWS: readonly Record<string, unknown>[] = [
  { slug: "safety-level", redAt: 1, yellowAt: 2, greenAt: 3, blueAt: 4 },
  { slug: "surplus-hours", blackAt: -12, redAt: -8, yellowAt: -4, greenAt: 0, blueAt: 4 },
  { slug: "capacity-hours", blackAt: -4, redAt: 0, yellowAt: 4, greenAt: 8, blueAt: 12 },
  { slug: "sleep-hours", redAt: 6, yellowAt: 7, greenAt: 8, blueAt: 9 },
]

const IN_THE_GROUP = [SAFETY_ROW, SURPLUS_ROW, CAPACITY_ROW, SLEEP_ROW]

const ANSWERED: { readouts: readonly Record<string, unknown>[] } = { readouts: IN_THE_GROUP }

let store: ReturnType<typeof Bun.serve>
let server: ReturnType<typeof Bun.serve>
let origin: string
let tile: Tile
let carried: Relaying
let askedWith: Tile["askedWith"]
let drawn: Tile["drawn"]

beforeAll(() => {
  store = servingStore((asked) => {
    if (asked.pageTypeSlug === "readout") return rowsAsked(ANSWERED.readouts, asked.where)
    if (asked.pageTypeSlug === "readout-group") return [{ slug: GROUP }]
    const named = asked.where?.slug?.is
    return SCALE_ROWS.filter((row) => row.slug === named)
  })
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
  tile = tileAt(origin, PATH, GROUP, RING_CREDENTIAL)
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
  ANSWERED.readouts = IN_THE_GROUP
})

const carryNow = async (at: Date = new Date()): Promise<undefined> => {
  await carried(SAFETY, 3, at)
  await carried(SURPLUS, 5, at)
  await carried(CAPACITY, 6, at)
  await carried(SLEEP, 6.5, at)
  return undefined
}

test("a caller holding no ring credential is refused", async () => {
  await carryNow()
  expect((await askedWith(null)).status).toBe(401)
  expect((await askedWith(crypto.randomUUID())).status).toBe(401)
})

test("the widget's body is a non-empty list under `stoplights`", async () => {
  await carryNow()
  const stoplights = await drawn()
  expect(Array.isArray(stoplights)).toBe(true)
  expect(stoplights.length).toBeGreaterThan(0)
})

test("the four readouts the group has are drawn in the order their places state", async () => {
  await carryNow()
  const stoplights = await drawn()
  expect(stoplights.map((one) => one.habit)).toEqual(["safety", "surplus", "capacity", "sleep"])
})

test("the color is the rung each reading reaches on that readout's own scale", async () => {
  await carryNow()
  const [safety, surplus, capacity, sleep] = await drawn()
  expect(safety?.tier).toBe("green")
  expect(surplus?.tier).toBe("blue")
  expect(surplus?.nextTier).toBeUndefined()
  expect(capacity?.tier).toBe("yellow")
  expect(capacity?.nextTier).toBe("green")
  expect(capacity?.progress).toBe(0.5)
  expect(sleep?.tier).toBe("red")
  expect(sleep?.nextTier).toBe("yellow")
})

test("nothing carried in keeps four rings rather than dropping them", async () => {
  const stoplights = await drawn()
  expect(stoplights.length).toBe(4)
  for (const one of stoplights) {
    expect(one.readingHeld).toBe("none")
    expect(one.reading).toBe("")
    expect(one.tier).toBe("black")
  }
})

test("every stoplight carries a tier that is one of the six colors the phone decodes", async () => {
  await carryNow()
  for (const one of await drawn()) {
    expect(TIERS).toContain(colorIn(one, "tier"))
    if (one.nextTier !== undefined) expect(TIERS).toContain(colorIn(one, "nextTier"))
  }
})

test("the label and the key are read off the readout's page rather than named in the route", async () => {
  await carryNow()
  const [safety] = await drawn()
  expect(safety?.label).toBe("Safety")
  expect(safety?.habit).toBe("safety")

  ANSWERED.readouts = [{ ...SAFETY_ROW, label: "How safe" }, SURPLUS_ROW, CAPACITY_ROW, SLEEP_ROW]
  expect((await drawn())[0]?.label).toBe("How safe")
})

test("a readout joining the group reaches the tile without this route changing", async () => {
  await carryNow()
  ANSWERED.readouts = [
    ...IN_THE_GROUP,
    {
      slug: "upkeep-plants",
      label: "Plants",
      place: 4,
      scale: `${readoutScale.slug}/${safetyLevel.slug}`,
      wireKey: "plants",
      groups: [GROUP_AT],
    },
  ]
  const stoplights = await drawn()
  expect(stoplights.length).toBe(5)
  expect(stoplights.map((one) => one.habit)).toContain("plants")
})

test("a readout the group does not name is left off the tile", async () => {
  await carryNow()
  ANSWERED.readouts = [
    ...IN_THE_GROUP,
    {
      slug: "cost-multiplier",
      label: "Cost",
      place: 1,
      scale: `${readoutScale.slug}/${safetyLevel.slug}`,
      wireKey: "cost",
      groups: [`${readoutGroup.slug}/${costGroup.slug}`],
    },
  ]
  expect((await drawn()).map((one) => one.habit)).not.toContain("cost")
})

test("the reading is a string, which is what the widget decodes", async () => {
  await carryNow()
  for (const one of await drawn()) expect(typeof one.reading).toBe("string")
})

test("a reading taken long ago keeps what it holds on the ring", async () => {
  await carryNow(new Date(Date.now() - 46 * 60_000))
  for (const one of await drawn()) {
    expect(one.readingHeld).toBeUndefined()
    expect(one.reading).not.toBe("")
  }
})

test("only a group no readout is left in answers 503", async () => {
  await carryNow()
  expect((await tile.answer()).status).toBe(200)
  ANSWERED.readouts = []
  expect((await tile.answer()).status).toBe(503)
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  await carryNow()
  expect((await tile.answer()).headers.get("Cache-Control")).toBe("no-store")
  readingsDropped()
  expect((await tile.answer()).headers.get("Cache-Control")).toBe("no-store")
})
