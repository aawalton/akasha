import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { dropRelayed } from "../readout-relay/readout-relay.module.code.ts"
import { relayedFor } from "../readout-relay/readout-relay.module.test-fixtures.ts"
import {
  answerStoplightsAdmittedBy,
  inPlaceOrder,
  type Stoplight,
} from "./readout-group-serving.module.code.ts"

const GROUP = "a-group-named-only-in-this-test"

const READOUT = "a-readout-named-only-in-this-test"

const SCALE = "a-scale-named-only-in-this-test"

const READOUT_ROW = {
  slug: READOUT,
  label: "Safety",
  unit: "levels",
  place: 1,
  scaleSlug: SCALE,
  wireKey: "safety",
  groupSlugs: [GROUP],
}

const SCALE_ROW = { slug: SCALE, redAt: 1, yellowAt: 2, greenAt: 3, blueAt: 4 }

const ANSWERED: {
  readouts: readonly Record<string, unknown>[]
  scales: readonly Record<string, unknown>[]
} = { readouts: [READOUT_ROW], scales: [SCALE_ROW] }

let store: ReturnType<typeof Bun.serve>

beforeAll(() => {
  store = Bun.serve({
    port: 0,
    fetch: async (request) => {
      const asked = (await request.json()) as { pageTypeSlug: string }
      if (asked.pageTypeSlug === "readout") return Response.json({ rows: ANSWERED.readouts })
      return Response.json({ rows: ANSWERED.scales })
    },
  })
  process.env.PAGES_SERVICE_ORIGIN = `http://localhost:${store.port}`
})

afterAll(() => {
  store.stop()
})

beforeEach(() => {
  dropRelayed()
  ANSWERED.readouts = [READOUT_ROW]
  ANSWERED.scales = [SCALE_ROW]
})

const drawn = () => answerStoplightsAdmittedBy(new Request("http://a.test/"), () => null, GROUP)

async function stoplights(): Promise<readonly Stoplight[]> {
  const answered = await drawn()
  expect(answered.status).toBe(200)
  return ((await answered.json()) as { stoplights: readonly Stoplight[] }).stoplights
}

test("a refusal a guard answers is served whole rather than made again here", async () => {
  const refused = await answerStoplightsAdmittedBy(
    new Request("http://a.test/"),
    () => new Response("held back", { status: 403 }),
    GROUP
  )
  expect(refused.status).toBe(403)
  expect(await refused.text()).toBe("held back")
})

test("a group no readout is left in is answered as no reading rather than as empty", async () => {
  const answered = await drawn()
  expect(answered.status).toBe(503)
  expect(await answered.json()).toEqual({ ok: false, error: "No reading." })
})

test("the color answered is the rung the reading reaches on the scale the readout names", async () => {
  relayedFor(READOUT, 2.5)
  const [one] = await stoplights()
  expect(one?.tier).toBe("yellow")
  expect(one?.nextTier).toBe("green")
  expect(one?.progress).toBe(0.5)
})

test("the label and the key answered are the ones the readout's own page carries", async () => {
  relayedFor(READOUT, 3)
  const [one] = await stoplights()
  expect(one?.label).toBe("Safety")
  expect(one?.habit).toBe("safety")
})

test("a readout whose page states no format has its reading answered as that number", async () => {
  relayedFor(READOUT, 2.5)
  expect((await stoplights())[0]?.reading).toBe("2.5")
  dropRelayed()
  relayedFor(READOUT, -1.5)
  expect((await stoplights())[0]?.reading).toBe("-1.5")
})

test("the reading answered is written the way the readout's own page states", async () => {
  ANSWERED.readouts = [{ ...READOUT_ROW, figureFormat: "decimal" }]
  relayedFor(READOUT, -0.008333333333334636)
  expect((await stoplights())[0]?.reading).toBe("-0.01")
})

test("a reading is never answered as the whole tail of the float it was added up from", async () => {
  ANSWERED.readouts = [{ ...READOUT_ROW, figureFormat: "decimal" }]
  relayedFor(READOUT, 2.6666666666666665)
  const said = (await stoplights())[0]?.reading ?? ""
  expect(said.length).toBeLessThanOrEqual(6)
  expect(said).toBe("2.67")
})

test("a reading below every rung is black rather than left out", async () => {
  relayedFor(READOUT, -2)
  const [one] = await stoplights()
  expect(one?.tier).toBe("black")
  expect(one?.nextTier).toBe("red")
  expect(one?.progress).toBeUndefined()
})

test("a reading on the highest rung has no tier above that rung", async () => {
  relayedFor(READOUT, 5)
  const [one] = await stoplights()
  expect(one?.tier).toBe("blue")
  expect(one?.nextTier).toBeUndefined()
})

test("a reading older than the window is left out rather than colored", async () => {
  relayedFor(READOUT, 3, new Date(Date.now() - 46 * 60_000))
  expect((await drawn()).status).toBe(503)
})

test("a reading inside the window is still a reading", async () => {
  relayedFor(READOUT, 3, new Date(Date.now() - 44 * 60_000))
  expect((await drawn()).status).toBe(200)
})

test("a readout whose page names no label is left out rather than labelled here", async () => {
  relayedFor(READOUT, 3)
  ANSWERED.readouts = [{ ...READOUT_ROW, label: "  " }]
  expect((await drawn()).status).toBe(503)
})

test("a readout whose page names no scale is left out rather than colored", async () => {
  relayedFor(READOUT, 3)
  ANSWERED.readouts = [{ slug: READOUT, label: "Safety" }]
  expect((await drawn()).status).toBe(503)
})

test("a scale the store withholds leaves its readout out rather than colored", async () => {
  relayedFor(READOUT, 3)
  ANSWERED.scales = []
  expect((await drawn()).status).toBe(503)
})

test("the readouts are answered in the order the place on each page states", () => {
  const ordered = inPlaceOrder([
    { slug: "c", place: 9 },
    { slug: "a", place: 1 },
    { slug: "b", place: 4 },
  ])
  expect(ordered.map((row) => row.slug)).toEqual(["a", "b", "c"])
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  relayedFor(READOUT, 3)
  expect((await drawn()).headers.get("Cache-Control")).toBe("no-store")
  dropRelayed()
  expect((await drawn()).headers.get("Cache-Control")).toBe("no-store")
})
