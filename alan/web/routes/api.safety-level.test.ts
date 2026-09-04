// Alan's safety tile, driven over real HTTP: the relay carrier POSTs a reading into his receiving
// route, and the group-serving path answers it as the `stoplights` body his shipped widget
// decodes. The relay secret is the only made-up thing here, generated fresh for each run.
//
// The reading in these tests is a fixture. Alan's own level is never read here, and no test
// asserts a level as though it were his.
//
// What this pins that nothing else does: the shipped Swift decodes `stoplights` as a NON-EMPTY
// array whose every element carries a `tier` that is one of six colour names. An empty array, a
// missing `tier`, or a colour outside that set fails the whole decode and the tile falls back to
// its cache and then to "No signal". So the shape below is a contract with a binary already on
// Alan's phone, not a convention this repository is free to change.
import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { dropRelayed, RELAY_PATH, relayReading } from "@akasha/readout-system/readout-relay"
import { action } from "./api.readout-relay.ts"

// This workspace preloads happy-dom, which replaces `globalThis.Response` with one `Bun.serve`
// refuses to answer with. The preload keeps the native `fetch`, so the native `Response` comes
// back off any answer that fetch gives. Without this the file passes from the repository root
// and fails from this folder, which reads as a broken route rather than a swapped global.
globalThis.Response = (await fetch("data:text/plain,")).constructor as typeof Response

const RELAY_SECRET = crypto.randomUUID()
const READOUT = "upkeep-safety"
const GROUP = "safety"

process.env.READING_RELAY_SECRET = RELAY_SECRET

const TIERS = ["black", "red", "orange", "yellow", "green", "blue"]

// The rungs Alan's `safety-level` scale page states, and the keys his `upkeep-safety` readout
// page carries. Held here so a change to either page shows up as a failure rather than as a
// blank tile.
const READOUT_ROW = {
  slug: READOUT,
  label: "Safety",
  unit: "levels",
  place: 1,
  scaleSlug: "safety-level",
  wireKey: GROUP,
  groupSlugs: [GROUP],
}

const SCALE_ROW = { slug: "safety-level", redAt: 1, yellowAt: 2, greenAt: 3, blueAt: 4 }

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
      if (pathname === "/api/safety-level") {
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

const tile = () => fetch(`${origin}/api/safety-level`)

const carry = (secret: string, body: unknown) =>
  fetch(`${origin}${RELAY_PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Relay-Secret": secret },
    body: JSON.stringify(body),
  })

const carryNow = (value: number, at: Date = new Date()) =>
  relayReading(origin, RELAY_SECRET, { readout: READOUT, value, at: at.toISOString() })

async function drawn(): Promise<readonly Stoplight[]> {
  const answered = await tile()
  expect(answered.status).toBe(200)
  const body = (await answered.json()) as { stoplights: readonly Stoplight[] }
  return body.stoplights
}

test("a carrier holding no relay secret is refused", async () => {
  const bare = await fetch(`${origin}${RELAY_PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  })
  expect(bare.status).toBe(401)
  expect((await carry(crypto.randomUUID(), {})).status).toBe(401)
})

test("a body that is not a whole reading is refused rather than held", async () => {
  expect((await carry(RELAY_SECRET, { nope: 1 })).status).toBe(400)
  expect((await carry(RELAY_SECRET, { readout: READOUT, value: 3 })).status).toBe(400)
  expect((await carry(RELAY_SECRET, { readout: READOUT, value: 3, at: "soon" })).status).toBe(400)
})

test("a level below zero and between whole numbers crosses the relay whole", async () => {
  await carryNow(-1.5)
  const [one] = await drawn()
  expect(one?.reading).toBe("-1.5")
})

test("nothing carried in shows an empty ring rather than a level of zero", async () => {
  const [one] = await drawn()
  expect(one?.readingHeld).toBe("none")
  expect(one?.reading).toBe("")
  expect(one?.tier).toBe("black")
  expect(one?.label).toBe("Safety")
})

test("the widget's body is a non-empty list under `stoplights`", async () => {
  await carryNow(2.5)
  const stoplights = await drawn()
  expect(Array.isArray(stoplights)).toBe(true)
  expect(stoplights.length).toBeGreaterThan(0)
})

test("every stoplight carries a tier that is one of the six colours the phone decodes", async () => {
  for (const level of [-2, -1.5, 0, 0.5, 1, 2, 2.5, 3, 4, 5]) {
    dropRelayed()
    await carryNow(level)
    for (const one of await drawn()) {
      expect(TIERS).toContain(one.tier)
      if (one.nextTier !== undefined) expect(TIERS).toContain(one.nextTier)
    }
  }
})

test("the colour is resolved here rather than sent as rungs for the phone to work out", async () => {
  await carryNow(2.5)
  const [one] = await drawn()
  expect(one?.tier).toBe("yellow")
  expect(one?.nextTier).toBe("green")
  expect(one?.progress).toBe(0.5)
  expect((one as Record<string, unknown>).scale).toBeUndefined()
})

test("the label and the key are read off the readout's page rather than named in the route", async () => {
  await carryNow(3)
  const [one] = await drawn()
  expect(one?.label).toBe("Safety")
  expect(one?.habit).toBe(GROUP)

  ANSWERED.readouts = [{ ...READOUT_ROW, label: "How safe" }]
  expect((await drawn())[0]?.label).toBe("How safe")
})

test("the rungs come off the scale page, so a level below every rung is black", async () => {
  await carryNow(0.5)
  const [one] = await drawn()
  expect(one?.tier).toBe("black")
  expect(one?.nextTier).toBe("red")
})

test("a level on the top rung has no tier above it", async () => {
  await carryNow(5)
  const [one] = await drawn()
  expect(one?.tier).toBe("blue")
  expect(one?.nextTier).toBeUndefined()
})

test("the reading is a string, which is what the widget decodes", async () => {
  await carryNow(3)
  expect(typeof (await drawn())[0]?.reading).toBe("string")
})

test("a reading arriving replaces the one held before it", async () => {
  await carryNow(1)
  await carryNow(4)
  expect((await drawn())[0]?.reading).toBe("4")
})

test("a reading past forty-five minutes shows an empty ring rather than the level it held", async () => {
  await carryNow(3, new Date(Date.now() - 46 * 60_000))
  const [one] = await drawn()
  expect(one?.readingHeld).toBe("stale")
  expect(one?.reading).toBe("")
})

test("a machine that starts again holds no reading, and says so rather than losing the ring", async () => {
  await carryNow(3)
  dropRelayed()
  const [one] = await drawn()
  expect(one?.readingHeld).toBe("none")
  expect(one?.reading).toBe("")
})

test("a reading never taken and one gone stale are told apart on the wire", async () => {
  const never = (await drawn())[0]?.readingHeld
  await carryNow(3, new Date(Date.now() - 46 * 60_000))
  const stale = (await drawn())[0]?.readingHeld
  expect(never).toBe("none")
  expect(stale).toBe("stale")
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  await carryNow(3)
  expect((await tile()).headers.get("Cache-Control")).toBe("no-store")
  dropRelayed()
  expect((await tile()).headers.get("Cache-Control")).toBe("no-store")
})
