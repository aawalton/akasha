// Alan's surplus tile, driven over real HTTP: the relay carrier POSTs a reading into his receiving
// route, and the group-serving path answers it as the `stoplights` body his shipped widget
// decodes. The relay secret is the only made-up thing here, generated fresh for each run.
//
// The reading in these tests is a fixture. Alan's own surplus is never read here, and no test
// asserts an hour count as though it were his.
//
// What this pins that the safety file does not: the `surplus-hours` scale is the first one whose
// rungs are negative. A day that has eaten into the night reads below zero, and the widget still
// has to receive a tier, a next tier and a fraction between them. A scale read as though it began
// at zero would answer black for every ordinary day.
import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { dropRelayed, RELAY_PATH, relayReading } from "@akasha/readout-system/readout-relay"
import { action } from "./api.readout-relay.ts"

// This workspace preloads happy-dom, which replaces `globalThis.Response` with one `Bun.serve`
// refuses to answer with. The preload keeps the native `fetch`, so the native `Response` comes
// back off any answer that fetch gives.
globalThis.Response = (await fetch("data:text/plain,")).constructor as typeof Response

const RELAY_SECRET = crypto.randomUUID()
const READOUT = "upkeep-surplus"
const GROUP = "surplus"

process.env.READING_RELAY_SECRET = RELAY_SECRET

const TIERS = ["black", "red", "orange", "yellow", "green", "blue"]

// The rungs Alan's `surplus-hours` scale page states, and the keys his `upkeep-surplus` readout
// page carries. Held here so a change to either page shows up as a failure rather than as a
// blank tile.
const READOUT_ROW = {
  slug: READOUT,
  label: "Surplus",
  unit: "hours",
  place: 2,
  figureFormat: "decimal",
  scaleSlug: "surplus-hours",
  wireKey: GROUP,
  groupSlugs: [GROUP],
}

const SCALE_ROW = {
  slug: "surplus-hours",
  blackAt: -12,
  redAt: -8,
  yellowAt: -4,
  greenAt: 0,
  blueAt: 4,
}

const ANSWERED: { readouts: readonly Record<string, unknown>[] } = { readouts: [READOUT_ROW] }

let store: ReturnType<typeof Bun.serve>
let server: ReturnType<typeof Bun.serve>
let origin: string

beforeAll(() => {
  store = Bun.serve({
    port: 0,
    fetch: async (request) => {
      const asked = (await request.json()) as { pageTypeSlug: string }
      if (asked.pageTypeSlug === "readout") return Response.json({ rows: ANSWERED.readouts })
      return Response.json({ rows: [SCALE_ROW] })
    },
  })
  process.env.PAGES_SERVICE_ORIGIN = `http://localhost:${store.port}`
  server = Bun.serve({
    port: 0,
    fetch(request) {
      const { pathname } = new URL(request.url)
      if (pathname === RELAY_PATH) return action({ request } as never)
      if (pathname === "/api/surplus") {
        return answerStoplightsAdmittedBy(request, () => null, GROUP)
      }
      return new Response("no such route", { status: 404 })
    },
  })
  origin = `http://localhost:${server.port}`
})

afterAll(() => {
  server.stop()
  store.stop()
})

beforeEach(() => {
  dropRelayed()
  ANSWERED.readouts = [READOUT_ROW]
})

type Stoplight = {
  habit?: string
  label?: string
  tier: string
  reading?: string
  readingHeld?: string
  nextTier?: string
  progress?: number
}

const tile = () => fetch(`${origin}/api/surplus`)

const carryNow = (value: number, at: Date = new Date()) =>
  relayReading(origin, RELAY_SECRET, { readout: READOUT, value, at: at.toISOString() })

async function drawn(): Promise<readonly Stoplight[]> {
  const answered = await tile()
  expect(answered.status).toBe(200)
  const body = (await answered.json()) as { stoplights: readonly Stoplight[] }
  return body.stoplights
}

test("nothing carried in shows an empty ring rather than a surplus of zero", async () => {
  const [one] = await drawn()
  expect(one?.readingHeld).toBe("none")
  expect(one?.reading).toBe("")
  expect(one?.tier).toBe("black")
  expect(one?.label).toBe("Surplus")
})

test("the widget's body is a non-empty list under `stoplights`", async () => {
  await carryNow(1.5)
  const stoplights = await drawn()
  expect(Array.isArray(stoplights)).toBe(true)
  expect(stoplights.length).toBeGreaterThan(0)
})

test("a day that has eaten into the night reads below zero and still draws a tier", async () => {
  await carryNow(-2)
  const [one] = await drawn()
  expect(one?.reading).toBe("-2")
  expect(one?.tier).toBe("yellow")
  expect(one?.nextTier).toBe("green")
  expect(one?.progress).toBe(0.5)
})

test("every stoplight carries a tier that is one of the six colours the phone decodes", async () => {
  for (const hours of [-20, -12, -9, -6, -4, -1, 0, 2, 4, 9]) {
    dropRelayed()
    await carryNow(hours)
    for (const one of await drawn()) {
      expect(TIERS).toContain(one.tier)
      if (one.nextTier !== undefined) expect(TIERS).toContain(one.nextTier)
    }
  }
})

test("a whole night still ahead is the top rung, with no tier above it", async () => {
  await carryNow(5)
  const [one] = await drawn()
  expect(one?.tier).toBe("blue")
  expect(one?.nextTier).toBeUndefined()
})

test("a surplus below every rung is black", async () => {
  await carryNow(-20)
  const [one] = await drawn()
  expect(one?.tier).toBe("black")
})

test("a surplus of exactly zero is green rather than the rung beneath it", async () => {
  await carryNow(0)
  expect((await drawn())[0]?.tier).toBe("green")
})

test("the label and the key are read off the readout's page rather than named in the route", async () => {
  await carryNow(1)
  const [one] = await drawn()
  expect(one?.label).toBe("Surplus")
  expect(one?.habit).toBe(GROUP)
})

test("the reading is a string, which is what the widget decodes", async () => {
  await carryNow(1)
  expect(typeof (await drawn())[0]?.reading).toBe("string")
})

test("a reading past forty-five minutes shows an empty ring rather than the surplus it held", async () => {
  await carryNow(1, new Date(Date.now() - 46 * 60_000))
  const [one] = await drawn()
  expect(one?.readingHeld).toBe("stale")
  expect(one?.reading).toBe("")
})

test("a surplus of zero and a surplus never carried are told apart on the wire", async () => {
  await carryNow(0)
  const carried = (await drawn())[0]
  expect(carried?.reading).toBe("0")
  expect(carried?.readingHeld).toBeUndefined()

  dropRelayed()
  const absent = (await drawn())[0]
  expect(absent?.reading).toBe("")
  expect(absent?.readingHeld).toBe("none")
})

// A surplus is added up out of session hours, so it arrives as a float carrying its whole tail —
// twenty digits of it, and a tile drawing that on one line at one size breaks it off mid-number
// with an ellipsis. The readout page states `figure-format: decimal`, and these pin that the
// figure reaching the widget is written to that rather than handed over raw.
test("a surplus added up out of hours is written to the places the readout states", async () => {
  await carryNow(-0.008333333333334636)
  const [one] = await drawn()
  expect(one?.reading).toBe("-0.01")
})

test("a surplus is never sent to the tile as the whole tail of a float", async () => {
  await carryNow(2.6666666666666665)
  const said = (await drawn())[0]?.reading ?? ""
  expect(said).toBe("2.67")
  expect(said.length).toBeLessThanOrEqual(6)
})

test("a surplus rounding onto zero is written as zero rather than as a signed zero", async () => {
  await carryNow(-0.0004)
  expect((await drawn())[0]?.reading).toBe("0")
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  await carryNow(1)
  expect((await tile()).headers.get("Cache-Control")).toBe("no-store")
})
