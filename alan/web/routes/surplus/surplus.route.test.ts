import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { answerStoplightsAdmittedBy } from "akasha/readouts/group-serving/readout-group-serving.module.code.ts"
import {
  type Tile,
  tileAt,
} from "akasha/readouts/group-serving/readout-group-serving.module.test-fixtures.ts"
import { dropRelayed, RELAY_PATH } from "akasha/readouts/relay/readout-relay.module.code.ts"
import {
  type Relaying,
  relayingTo,
} from "akasha/readouts/relay/readout-relay.module.test-fixtures.ts"
import { action } from "../readout-relay/readout-relay.route.code.ts"

globalThis.Response = (await fetch("data:text/plain,")).constructor as typeof Response

const RELAY_SECRET = crypto.randomUUID()
const READOUT = "upkeep-surplus"
const GROUP = "surplus"
const PATH = "/api/surplus"

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
      if (pathname === PATH) {
        return answerStoplightsAdmittedBy(request, () => null, GROUP)
      }
      return new Response("no such route", { status: 404 })
    },
  })
  const origin = `http://localhost:${server.port}`
  tile = tileAt(origin, PATH, GROUP)
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

const carryNow = (value: number, at: Date = new Date()) => carried(READOUT, value, at)

test("nothing carried in shows an empty ring rather than a surplus of zero", async () => {
  const [one] = await tile.drawn()
  expect(one?.readingHeld).toBe("none")
  expect(one?.reading).toBe("")
  expect(one?.tier).toBe("black")
  expect(one?.label).toBe("Surplus")
})

test("the widget's body is a non-empty list under `stoplights`", async () => {
  await carryNow(1.5)
  const stoplights = await tile.drawn()
  expect(Array.isArray(stoplights)).toBe(true)
  expect(stoplights.length).toBeGreaterThan(0)
})

test("a day that has eaten into the night reads below zero and still draws a tier", async () => {
  await carryNow(-2)
  const [one] = await tile.drawn()
  expect(one?.reading).toBe("-2")
  expect(one?.tier).toBe("yellow")
  expect(one?.nextTier).toBe("green")
  expect(one?.progress).toBe(0.5)
})

test("every stoplight carries a tier that is one of the six colors the phone decodes", async () => {
  for (const hours of [-20, -12, -9, -6, -4, -1, 0, 2, 4, 9]) {
    dropRelayed()
    await carryNow(hours)
    for (const one of await tile.drawn()) {
      expect(TIERS).toContain(String(one.tier))
      if (one.nextTier !== undefined) expect(TIERS).toContain(String(one.nextTier))
    }
  }
})

test("a whole night still ahead is the top rung, with no tier above it", async () => {
  await carryNow(5)
  const [one] = await tile.drawn()
  expect(one?.tier).toBe("blue")
  expect(one?.nextTier).toBeUndefined()
})

test("a surplus below every rung is black", async () => {
  await carryNow(-20)
  const [one] = await tile.drawn()
  expect(one?.tier).toBe("black")
})

test("a surplus of exactly zero is green rather than the rung beneath it", async () => {
  await carryNow(0)
  expect((await tile.drawn())[0]?.tier).toBe("green")
})

test("the label and the key are read off the readout's page rather than named in the route", async () => {
  await carryNow(1)
  const [one] = await tile.drawn()
  expect(one?.label).toBe("Surplus")
  expect(one?.habit).toBe(GROUP)
})

test("the reading is a string, which is what the widget decodes", async () => {
  await carryNow(1)
  expect(typeof (await tile.drawn())[0]?.reading).toBe("string")
})

test("a reading past forty-five minutes shows an empty ring rather than the surplus it held", async () => {
  await carryNow(1, new Date(Date.now() - 46 * 60_000))
  const [one] = await tile.drawn()
  expect(one?.readingHeld).toBe("stale")
  expect(one?.reading).toBe("")
})

test("a surplus of zero and a surplus never carried are told apart on the wire", async () => {
  await carryNow(0)
  const held = (await tile.drawn())[0]
  expect(held?.reading).toBe("0")
  expect(held?.readingHeld).toBeUndefined()

  dropRelayed()
  const absent = (await tile.drawn())[0]
  expect(absent?.reading).toBe("")
  expect(absent?.readingHeld).toBe("none")
})

test("a surplus added up out of hours is floored to two significant figures", async () => {
  await carryNow(-0.008333333333334636)
  const [one] = await tile.drawn()
  expect(one?.reading).toBe("-0.0084")
})

test("a surplus is never sent to the tile as the whole tail of a float", async () => {
  await carryNow(2.6666666666666665)
  const said = String((await tile.drawn())[0]?.reading ?? "")
  expect(said).toBe("2.6")
  expect(said.length).toBeLessThanOrEqual(6)
})

test("a surplus smaller than a hundredth still carries two figures", async () => {
  await carryNow(-0.0004)
  expect((await tile.drawn())[0]?.reading).toBe("-0.00040")
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  await carryNow(1)
  expect((await tile.answer()).headers.get("Cache-Control")).toBe("no-store")
})
