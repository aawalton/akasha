import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { type Tile, tileAt } from "@akasha/readouts/readout-group-serving/testing"
import { dropRelayed, RELAY_PATH } from "@akasha/readouts/readout-relay"
import { type Relaying, relayingTo } from "@akasha/readouts/readout-relay/testing"
import { action } from "../jenny-readout-relay/jenny-readout-relay.route.code.ts"
import { loader } from "./jenny-surplus.route.code.ts"

const RING_CREDENTIAL = crypto.randomUUID()
const RELAY_SECRET = crypto.randomUUID()
const READOUT = "upkeep-surplus"
const GROUP = "surplus"
const PATH = "/api/surplus"

process.env.SMILINGJENNY_RING_CREDENTIAL = RING_CREDENTIAL
process.env.READING_RELAY_SECRET = RELAY_SECRET

const TIERS = ["black", "red", "orange", "yellow", "green", "blue"]

const READOUT_ROW = {
  slug: READOUT,
  label: "Surplus",
  unit: "hours",
  place: 2,
  scale: "surplus-hours",
  wireKey: GROUP,
  groups: [GROUP],
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
let heldOrigin: string | undefined
let tile: Tile
let carried: Relaying

beforeAll(() => {
  store = Bun.serve({
    port: 0,
    fetch: async (request) => {
      const asked = (await request.json()) as { pageTypeSlug: string }
      if (asked.pageTypeSlug === "readout") return Response.json({ rows: ANSWERED.readouts })
      return Response.json({ rows: [SCALE_ROW] })
    },
  })
  heldOrigin = process.env.PAGES_SERVICE_ORIGIN
  process.env.PAGES_SERVICE_ORIGIN = `http://localhost:${store.port}`
  server = Bun.serve({
    port: 0,
    fetch(request) {
      const { pathname } = new URL(request.url)
      if (pathname === RELAY_PATH) return action({ request } as never)
      if (pathname === PATH) return loader({ request })
      return new Response("no such route", { status: 404 })
    },
  })
  origin = `http://localhost:${server.port}`
  tile = tileAt(origin, PATH, GROUP, { "X-Ring-Credential": RING_CREDENTIAL })
  carried = relayingTo(origin, RELAY_SECRET)
})

afterAll(() => {
  server.stop()
  store.stop(true)
  if (heldOrigin === undefined) delete process.env.PAGES_SERVICE_ORIGIN
  else process.env.PAGES_SERVICE_ORIGIN = heldOrigin
})

beforeEach(() => {
  dropRelayed()
  ANSWERED.readouts = [READOUT_ROW]
})

const askedWith = (credential: string | null) =>
  fetch(`${origin}${PATH}`, {
    headers: credential === null ? {} : { "X-Ring-Credential": credential },
  })

const carry = (secret: string, body: unknown) =>
  fetch(`${origin}${RELAY_PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Relay-Secret": secret },
    body: JSON.stringify(body),
  })

const carryNow = (value: number, at: Date = new Date()) => carried(READOUT, value, at)

const drawn = () => tile.drawn()

test("a caller holding no ring credential is refused", async () => {
  await carryNow(1)
  expect((await askedWith(null)).status).toBe(401)
  expect((await askedWith(crypto.randomUUID())).status).toBe(401)
})

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
  expect((await carry(RELAY_SECRET, { readout: READOUT, value: 1 })).status).toBe(400)
  expect((await carry(RELAY_SECRET, { readout: READOUT, value: 1, at: "soon" })).status).toBe(400)
})

test("nothing carried in shows an empty ring rather than a surplus of zero", async () => {
  const [one] = await drawn()
  expect(one?.readingHeld).toBe("none")
  expect(one?.reading).toBe("")
  expect(one?.tier).toBe("black")
})

test("a surplus below zero and between whole numbers crosses the relay whole", async () => {
  await carryNow(-1.5)
  const [one] = await drawn()
  expect(one?.reading).toBe("-1.5")
})

test("the widget's body is a non-empty list under `stoplights`", async () => {
  await carryNow(1.5)
  const stoplights = await drawn()
  expect(Array.isArray(stoplights)).toBe(true)
  expect(stoplights.length).toBeGreaterThan(0)
})

test("every stoplight carries a tier that is one of the six colors the phone decodes", async () => {
  for (const hours of [-20, -12, -9, -6, -4, -1, 0, 2, 4, 9]) {
    dropRelayed()
    await carryNow(hours)
    for (const one of await drawn()) {
      expect(TIERS).toContain(String(one.tier))
      if (one.nextTier !== undefined) expect(TIERS).toContain(String(one.nextTier))
    }
  }
})

test("the color is resolved here rather than sent as rungs for the phone to work out", async () => {
  await carryNow(-2)
  const [one] = await drawn()
  expect(one?.tier).toBe("yellow")
  expect(one?.nextTier).toBe("green")
  expect(one?.progress).toBe(0.5)
  expect(one?.scale).toBeUndefined()

  dropRelayed()
  await carryNow(0)
  expect((await drawn())[0]?.tier).toBe("green")
})

test("the label and the key are read off the readout's page rather than named in the route", async () => {
  await carryNow(1)
  const [one] = await drawn()
  expect(one?.label).toBe("Surplus")
  expect(one?.habit).toBe(GROUP)

  ANSWERED.readouts = [{ ...READOUT_ROW, label: "Night left" }]
  expect((await drawn())[0]?.label).toBe("Night left")
})

test("the rungs come off the scale page, so a surplus below every rung is black", async () => {
  await carryNow(-20)
  expect((await drawn())[0]?.tier).toBe("black")

  dropRelayed()
  await carryNow(-12)
  const [atTheRung] = await drawn()
  expect(atTheRung?.tier).toBe("black")
  expect(atTheRung?.nextTier).toBe("red")
})

test("a whole night still ahead is the top rung, with no tier above it", async () => {
  await carryNow(5)
  const [one] = await drawn()
  expect(one?.tier).toBe("blue")
  expect(one?.nextTier).toBeUndefined()
})

test("the reading is a string, which is what the widget decodes", async () => {
  await carryNow(1)
  expect(typeof (await drawn())[0]?.reading).toBe("string")
})

test("a reading arriving replaces the one held before it", async () => {
  await carryNow(-3)
  await carryNow(2)
  expect((await drawn())[0]?.reading).toBe("2")
})

test("a reading past forty-five minutes shows an empty ring rather than what it held", async () => {
  await carryNow(1, new Date(Date.now() - 46 * 60_000))
  const [one] = await drawn()
  expect(one?.readingHeld).toBe("stale")
  expect(one?.reading).toBe("")
})

test("a machine that starts again holds no reading, and says so rather than losing the ring", async () => {
  await carryNow(1)
  dropRelayed()
  const [one] = await drawn()
  expect(one?.readingHeld).toBe("none")
  expect(one?.reading).toBe("")
})

test("a reading never taken and one gone stale are told apart on the wire", async () => {
  const never = (await drawn())[0]?.readingHeld
  await carryNow(1, new Date(Date.now() - 46 * 60_000))
  const stale = (await drawn())[0]?.readingHeld
  expect(never).toBe("none")
  expect(stale).toBe("stale")
})

test("a surplus added up out of hours is floored to two significant figures", async () => {
  await carryNow(-0.008333333333334636)
  const [one] = await drawn()
  expect(one?.reading).toBe("-0.0084")
})

test("a surplus is never sent to the tile as the whole tail of a float", async () => {
  await carryNow(2.6666666666666665)
  const said = String((await drawn())[0]?.reading ?? "")
  expect(said).toBe("2.6")
  expect(said.length).toBeLessThanOrEqual(6)
})

test("a surplus smaller than a hundredth still carries two figures", async () => {
  await carryNow(-0.0004)
  expect((await drawn())[0]?.reading).toBe("-0.00040")
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  await carryNow(1)
  expect((await tile.answer()).headers.get("Cache-Control")).toBe("no-store")
  dropRelayed()
  expect((await tile.answer()).headers.get("Cache-Control")).toBe("no-store")
})
