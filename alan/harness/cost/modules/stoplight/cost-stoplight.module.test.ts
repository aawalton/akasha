import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import {
  answerCostAdmittedBy,
  costStoplights,
} from "akasha/alan/harness/cost/modules/stoplight/cost-stoplight.module.code.ts"
import { cost as costGroup } from "akasha/alan/harness/readout/group/pages/cost/cost.readout-group.ts"
import { surplus as surplusGroup } from "akasha/alan/harness/readout/group/pages/surplus/surplus.readout-group.ts"
import { upkeep as upkeepGroup } from "akasha/alan/harness/readout/group/pages/upkeep/upkeep.readout-group.ts"
import { readoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.ts"
import type { Stoplight } from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import {
  agedOut,
  readingsDropped,
  relayedFor,
  rowsAsked,
  servingStore,
  storeGoes,
} from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.test-fixtures.ts"
import { surplusHours as surplusHoursScale } from "akasha/alan/harness/readout/scale/pages/surplus-hours.readout-scale.ts"
import { readoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.ts"

const COST = "cost-multiplier"

const SURPLUS = "upkeep-surplus"

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

const ANSWERED: {
  readouts: readonly Record<string, unknown>[]
  scales: readonly Record<string, unknown>[]
} = { readouts: [COST_ROW, SURPLUS_ROW], scales: [SCALE_ROW] }

let store: ReturnType<typeof Bun.serve>

beforeAll(() => {
  store = servingStore((asked) => {
    if (asked.pageTypeSlug === "readout") return rowsAsked(ANSWERED.readouts, asked.where)
    if (asked.pageTypeSlug === "readout-scale") return ANSWERED.scales
    return []
  })
})

afterAll(() => {
  storeGoes(store)
})

beforeEach(() => {
  readingsDropped()
  ANSWERED.readouts = [COST_ROW, SURPLUS_ROW]
  ANSWERED.scales = [SCALE_ROW]
})

const drawn = () => answerCostAdmittedBy(new Request("http://a.test/"), () => null)

async function oneDrawn(): Promise<Stoplight | undefined> {
  const answered = await drawn()
  expect(answered.status).toBe(200)
  const body = (await answered.json()) as { stoplights: readonly Stoplight[] }
  return body.stoplights[0]
}

function costing(multiplier: number, surplusHours?: number): undefined {
  relayedFor(COST, multiplier)
  if (surplusHours !== undefined) relayedFor(SURPLUS, surplusHours)
  return undefined
}

test("a cost of nothing over four hours of surplus is blue", async () => {
  costing(0, 5)
  expect((await oneDrawn())?.tier).toBe("blue")
})

test("a cost of nothing over nothing of surplus is green", async () => {
  costing(0, 2)
  expect((await oneDrawn())?.tier).toBe("green")
})

test("a cost of one multiplier is yellow where a cost of nothing is green", async () => {
  costing(0, 2)
  expect((await oneDrawn())?.tier).toBe("green")
  readingsDropped()
  costing(1, 2)
  expect((await oneDrawn())?.tier).toBe("yellow")
})

test("a cost above one multiplier over four hours of surplus is red", async () => {
  costing(1.5, 5)
  expect((await oneDrawn())?.tier).toBe("red")
})

test("a cost above two multipliers is black whatever the surplus is", async () => {
  costing(32, 20)
  expect((await oneDrawn())?.tier).toBe("black")
})

test("a cost of nothing beneath eight hours of debt is black", async () => {
  costing(0, -20)
  expect((await oneDrawn())?.tier).toBe("black")
})

test("the color is read from the cost and the surplus rather than from the cost alone", async () => {
  costing(0.5, 5)
  expect((await oneDrawn())?.tier).toBe("yellow")
  readingsDropped()
  costing(0.5, -5)
  expect((await oneDrawn())?.tier).toBe("red")
})

test("a cost beside a surplus nothing was read for is black", async () => {
  relayedFor(COST, 0.5)
  expect((await oneDrawn())?.tier).toBe("black")
})

test("a surplus taken long ago colors the cost as a surplus taken now colors it", async () => {
  relayedFor(COST, 0.5)
  relayedFor(SURPLUS, 5, agedOut())
  expect((await oneDrawn())?.tier).toBe("yellow")
})

test("a cost nothing carried is answered as a stoplight carrying no figure", async () => {
  relayedFor(SURPLUS, 5)
  const one = await oneDrawn()
  expect(one?.tier).toBe("black")
  expect(one?.reading).toBe("")
  expect(one?.readingHeld).toBe("none")
})

test("a cost taken long ago is answered as a stoplight carrying its figure", async () => {
  relayedFor(COST, 0.5, agedOut())
  relayedFor(SURPLUS, 5)
  const one = await oneDrawn()
  expect(one?.reading).toBe("0.5")
  expect(one?.readingHeld).toBeUndefined()
})

test("a cost of zero and a cost never carried are told apart on the wire", async () => {
  costing(0, 5)
  const carried = await oneDrawn()
  expect(carried?.reading).toBe("0")
  expect(carried?.readingHeld).toBeUndefined()

  readingsDropped()
  relayedFor(SURPLUS, 5)
  const absent = await oneDrawn()
  expect(absent?.reading).toBe("")
  expect(absent?.readingHeld).toBe("none")
})

test("no stoplight carries a tier above or a fraction climbed", async () => {
  costing(0.5, 5)
  const one = await oneDrawn()
  expect(one?.nextTier).toBeUndefined()
  expect(one?.progress).toBeUndefined()
})

test("the label and the key answered are the ones the readout's own page carries", async () => {
  costing(0.5, 5)
  const one = await oneDrawn()
  expect(one?.label).toBe("Cost")
  expect(one?.habit).toBe("cost")
})

test("the figure is the multiplier written as a figure", async () => {
  costing(0.625, 5)
  expect((await oneDrawn())?.reading).toBe("0.6")
})

test("a cost above nothing is never answered blue", async () => {
  for (const multiplier of [0.5, 1, 1.5, 32]) {
    for (const hours of [-20, -6, -1, 1, 5]) {
      readingsDropped()
      costing(multiplier, hours)
      expect((await oneDrawn())?.tier).not.toBe("blue")
    }
  }
})

test("a readout whose page stills the readout is left out rather than answered", async () => {
  costing(0.5, 5)
  ANSWERED.readouts = [{ ...COST_ROW, enabled: false }, SURPLUS_ROW]
  expect((await drawn()).status).toBe(503)
})

test("a readout whose page names no wire key is left out rather than answered keyless", async () => {
  costing(0.5, 5)
  ANSWERED.readouts = [{ ...COST_ROW, wireKey: "  " }, SURPLUS_ROW]
  expect((await drawn()).status).toBe(503)
})

test("a group no readout is left in is answered as no reading", async () => {
  costing(0.5, 5)
  ANSWERED.readouts = [SURPLUS_ROW]
  const answered = await drawn()
  expect(answered.status).toBe(503)
  expect(await answered.json()).toEqual({ ok: false, error: "No reading." })
})

test("a scale the store withholds leaves the color the surplus figure sets", async () => {
  costing(0.5, 5)
  ANSWERED.scales = []
  expect((await oneDrawn())?.tier).toBe("yellow")
})

test("a scale the store withholds leaves the cost carrying no surplus", async () => {
  falling(0.5, 9, 2)
  ANSWERED.scales = []
  expect((await oneDrawn())?.coloredWith).toBeUndefined()
})

test("a refusal a guard answers is served whole rather than made again here", async () => {
  const refused = await answerCostAdmittedBy(
    new Request("http://a.test/"),
    () => new Response("held back", { status: 403 })
  )
  expect(refused.status).toBe(403)
  expect(await refused.text()).toBe("held back")
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  costing(0.5, 5)
  expect((await drawn()).headers.get("Cache-Control")).toBe("no-store")
})

function falling(cost: number, hours: number, rate: number): Date {
  const took = new Date()
  relayedFor(COST, cost, took)
  relayedFor(SURPLUS, hours, took, rate)
  return took
}

test("a cost above nothing carries the surplus its color was read with", async () => {
  const took = falling(0.5, 9, 2)
  const carried = (await oneDrawn())?.coloredWith
  expect(carried?.reading).toBe("9")
  expect(carried?.takenAt).toBe(took.toISOString())
  expect(carried?.fallsPerHour).toBe(2)
  expect(carried?.tier).toBe("blue")
})

test("the surplus carried brings the rungs the tile needs to color it again", async () => {
  falling(0.5, 9, 2)
  expect((await oneDrawn())?.coloredWith?.rungs?.length).toBe(5)
})

test("no stoplight carries an instant worked out at the moment taken", async () => {
  falling(0.5, 9, 2)
  const one = await oneDrawn()
  expect(Object.keys(one ?? {})).not.toContain("fallsPastAt")
  expect(Object.keys(one?.coloredWith ?? {})).not.toContain("fallsPastAt")
})

test("a cost of nothing carries no surplus, an hour of it costing Alan nothing", async () => {
  falling(0, 9, 1)
  expect((await oneDrawn())?.coloredWith).toBeUndefined()
})

test("a surplus falling at nothing an hour is carried with neither moment nor rungs", async () => {
  falling(0.5, 9, 0)
  const carried = (await oneDrawn())?.coloredWith
  expect(carried?.reading).toBe("9")
  expect(carried?.fallsPerHour).toBeUndefined()
  expect(carried?.rungs).toBeUndefined()
})

test("a cost carried with no surplus beside it carries none", async () => {
  relayedFor(COST, 0.5)
  expect((await oneDrawn())?.coloredWith).toBeUndefined()
})

test("a surplus taken long ago is carried, the figure on it being read all the same", async () => {
  relayedFor(COST, 0.5)
  relayedFor(SURPLUS, 9, agedOut(), 1)
  expect((await oneDrawn())?.coloredWith?.reading).toBe("9")
})

test("a caller wanting the colors without a route asks for them on their own", async () => {
  costing(0.5, 5)
  const held = await costStoplights()
  expect(held.length).toBe(1)
  expect(held[0]?.habit).toBe("cost")
  expect(held[0]?.tier).toBe("yellow")
})
