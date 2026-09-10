import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import type { Stoplight } from "akasha/readouts/group-serving/readout-group-serving.module.code.ts"
import { dropRelayed } from "akasha/readouts/relay/readout-relay.module.code.ts"
import { relayedFor } from "akasha/readouts/relay/readout-relay.module.test-fixtures.ts"
import { answerCostAdmittedBy, costStoplights } from "./cost-stoplight.module.code.ts"

const COST = "cost-multiplier"

const SURPLUS = "upkeep-surplus"

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

const ANSWERED: {
  readouts: readonly Record<string, unknown>[]
  scales: readonly Record<string, unknown>[]
} = { readouts: [COST_ROW, SURPLUS_ROW], scales: [SCALE_ROW] }

type Asked = {
  pageTypeSlug: string
  where?: { slug?: { is?: string }; groups?: { has?: string } }
}

function readoutsAsked(where: Asked["where"]): readonly Record<string, unknown>[] {
  const named = where?.slug?.is
  if (named !== undefined) return ANSWERED.readouts.filter((row) => row.slug === named)
  const grouped = where?.groups?.has
  if (grouped === undefined) return ANSWERED.readouts
  return ANSWERED.readouts.filter(
    (row) => Array.isArray(row.groups) && (row.groups as readonly string[]).includes(grouped)
  )
}

let store: ReturnType<typeof Bun.serve>
let heldOrigin: string | undefined

beforeAll(() => {
  store = Bun.serve({
    port: 0,
    fetch: async (request) => {
      const asked = (await request.json()) as Asked
      if (asked.pageTypeSlug === "readout") {
        return Response.json({ rows: readoutsAsked(asked.where) })
      }
      if (asked.pageTypeSlug === "readout-scale") return Response.json({ rows: ANSWERED.scales })
      return Response.json({ rows: [] })
    },
  })
  heldOrigin = process.env.PAGES_SERVICE_ORIGIN
  process.env.PAGES_SERVICE_ORIGIN = `http://localhost:${store.port}`
})

afterAll(() => {
  store.stop(true)
  if (heldOrigin === undefined) delete process.env.PAGES_SERVICE_ORIGIN
  else process.env.PAGES_SERVICE_ORIGIN = heldOrigin
})

beforeEach(() => {
  dropRelayed()
  ANSWERED.readouts = [COST_ROW, SURPLUS_ROW]
  ANSWERED.scales = [SCALE_ROW]
})

const agedOut = () => new Date(Date.now() - 46 * 60_000)

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

test("a cost of nothing is green whatever the surplus is", async () => {
  costing(0, -20)
  expect((await oneDrawn())?.tier).toBe("green")
})

test("a cost above one is black whatever the surplus is", async () => {
  costing(1.5, 5)
  expect((await oneDrawn())?.tier).toBe("black")
})

test("a cost of one or less is yellow where the surplus is blue", async () => {
  costing(1, 5)
  expect((await oneDrawn())?.tier).toBe("yellow")
})

test("a cost of one or less is red where the surplus is green", async () => {
  costing(0.5, 1)
  expect((await oneDrawn())?.tier).toBe("red")
})

test("a cost of one or less is black where the surplus is beneath green", async () => {
  costing(0.5, -2)
  expect((await oneDrawn())?.tier).toBe("black")
})

test("the color is read from the cost and the surplus rather than from the cost alone", async () => {
  costing(0.5, 5)
  expect((await oneDrawn())?.tier).toBe("yellow")
  dropRelayed()
  costing(0.5, 1)
  expect((await oneDrawn())?.tier).toBe("red")
})

test("a surplus nothing carried colors the cost as a black surplus colors it", async () => {
  relayedFor(COST, 0.5)
  expect((await oneDrawn())?.tier).toBe("black")
})

test("a surplus older than the window colors the cost as a black surplus colors it", async () => {
  relayedFor(COST, 0.5)
  relayedFor(SURPLUS, 5, agedOut())
  expect((await oneDrawn())?.tier).toBe("black")
})

test("a cost nothing carried is answered as a stoplight carrying no figure", async () => {
  relayedFor(SURPLUS, 5)
  const one = await oneDrawn()
  expect(one?.tier).toBe("black")
  expect(one?.reading).toBe("")
  expect(one?.readingHeld).toBe("none")
})

test("a cost older than the window is answered as a stoplight carrying no figure", async () => {
  relayedFor(COST, 0.5, agedOut())
  relayedFor(SURPLUS, 5)
  const one = await oneDrawn()
  expect(one?.tier).toBe("black")
  expect(one?.reading).toBe("")
  expect(one?.readingHeld).toBe("stale")
})

test("a cost of zero and a cost never carried are told apart on the wire", async () => {
  costing(0, 5)
  const carried = await oneDrawn()
  expect(carried?.reading).toBe("0")
  expect(carried?.readingHeld).toBeUndefined()

  dropRelayed()
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
  expect((await oneDrawn())?.reading).toBe("0.62")
})

test("a cost is never answered blue", async () => {
  for (const multiplier of [0, 0.5, 1, 1.5, 32]) {
    for (const hours of [-20, -6, -1, 1, 5]) {
      dropRelayed()
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

test("a scale the store withholds colors the cost as a black surplus colors it", async () => {
  costing(0.5, 5)
  ANSWERED.scales = []
  expect((await oneDrawn())?.tier).toBe("black")
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

test("a caller wanting the colors without a route asks for them on their own", async () => {
  costing(0.5, 5)
  const held = await costStoplights()
  expect(held.length).toBe(1)
  expect(held[0]?.habit).toBe("cost")
  expect(held[0]?.tier).toBe("yellow")
})
