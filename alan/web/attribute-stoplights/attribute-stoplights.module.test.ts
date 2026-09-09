import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { join } from "node:path"
import { answerStoplightsAdmittedBy } from "akasha/readouts/group-serving/readout-group-serving.module.code.ts"
import {
  colorIn,
  readoutsNaming,
  type Tile,
  tileAt,
} from "akasha/readouts/group-serving/readout-group-serving.module.test-fixtures.ts"
import { dropRelayed } from "akasha/readouts/relay/readout-relay.module.code.ts"
import { relayedFor } from "akasha/readouts/relay/readout-relay.module.test-fixtures.ts"
import { GROUP, WIRE_KEY_NAME } from "./attribute-stoplights.module.code.ts"

globalThis.Response = (await fetch("data:text/plain,")).constructor as typeof Response

const TIERS = ["black", "red", "orange", "yellow", "green", "blue"]

const PATH = "/api/attribute-stoplights"

const READOUT_ROWS = [
  {
    slug: "attribute-strength",
    label: "Strength",
    unit: "points",
    place: 1,
    scale: "attribute-points",
    wireKey: "strength",
    groups: [GROUP],
  },
  {
    slug: "attribute-endurance",
    label: "Endurance",
    unit: "points",
    place: 2,
    scale: "attribute-points",
    wireKey: "endurance",
    groups: [GROUP],
  },
  {
    slug: "attribute-constitution",
    label: "Constitution",
    unit: "points",
    place: 3,
    scale: "attribute-points",
    wireKey: "constitution",
    groups: [GROUP],
  },
  {
    slug: "attribute-wisdom",
    label: "Wisdom",
    unit: "points",
    place: 4,
    scale: "attribute-points",
    wireKey: "wisdom",
    groups: [GROUP],
  },
  {
    slug: "attribute-intelligence",
    label: "Intelligence",
    unit: "points",
    place: 5,
    scale: "attribute-points",
    wireKey: "intelligence",
    groups: [GROUP],
  },
  {
    slug: "attribute-charisma",
    label: "Charisma",
    unit: "points",
    place: 6,
    scale: "attribute-points",
    wireKey: "charisma",
    groups: [GROUP],
  },
]

const SCALE_ROWS: Record<string, Record<string, unknown>> = {
  "attribute-points": {
    slug: "attribute-points",
    redAt: 0.25,
    yellowAt: 0.5,
    greenAt: 1,
    blueAt: 2,
  },
}

const CARRIED: readonly (readonly [string, number])[] = [
  ["attribute-strength", 1.4],
  ["attribute-endurance", 0.75],
  ["attribute-constitution", 2.3],
  ["attribute-wisdom", 0],
  ["attribute-intelligence", 0.3],
  ["attribute-charisma", 0.6],
]

const ANSWERED: { readouts: readonly Record<string, unknown>[] } = { readouts: READOUT_ROWS }

let store: ReturnType<typeof Bun.serve>
let server: ReturnType<typeof Bun.serve>
let heldOrigin: string | undefined
let tile: Tile

beforeAll(() => {
  store = Bun.serve({
    port: 0,
    fetch: async (request) => {
      const asked = (await request.json()) as {
        pageTypeSlug: string
        where?: { slug?: { is?: string } }
      }
      if (asked.pageTypeSlug === "readout") return Response.json({ rows: ANSWERED.readouts })
      const named = asked.where?.slug?.is ?? ""
      const scale = SCALE_ROWS[named]
      return Response.json({ rows: scale === undefined ? [] : [scale] })
    },
  })
  heldOrigin = process.env.PAGES_SERVICE_ORIGIN
  process.env.PAGES_SERVICE_ORIGIN = `http://localhost:${store.port}`
  server = Bun.serve({
    port: 0,
    fetch(request) {
      const { pathname } = new URL(request.url)
      if (pathname === PATH) {
        return answerStoplightsAdmittedBy(request, () => null, GROUP, WIRE_KEY_NAME)
      }
      return new Response("no such route", { status: 404 })
    },
  })
  tile = tileAt(`http://localhost:${server.port}`, PATH, WIRE_KEY_NAME)
})

afterAll(() => {
  server.stop()
  store.stop(true)
  if (heldOrigin === undefined) delete process.env.PAGES_SERVICE_ORIGIN
  else process.env.PAGES_SERVICE_ORIGIN = heldOrigin
})

beforeEach(() => {
  dropRelayed()
  ANSWERED.readouts = READOUT_ROWS
})

function carryAll(at: Date = new Date()): undefined {
  for (const [readout, value] of CARRIED) relayedFor(readout, value, at)
}

const AKASHA = join(import.meta.dir, "..", "..", "..")

test("the group this answers for is the attributes group", () => {
  expect(GROUP).toBe("attributes")
})

test("the key a reading travels under is `attribute` rather than `habit`", () => {
  expect(WIRE_KEY_NAME).toBe("attribute")
})

test("the pages naming the attributes group are the six the fixture holds", async () => {
  expect(await readoutsNaming(AKASHA, GROUP)).toEqual([
    "attribute-charisma",
    "attribute-constitution",
    "attribute-endurance",
    "attribute-intelligence",
    "attribute-strength",
    "attribute-wisdom",
  ])
})

test("the fixture holds every page naming the group and no page it does not", async () => {
  expect(READOUT_ROWS.map((one) => one.slug).sort()).toEqual([
    ...(await readoutsNaming(AKASHA, GROUP)),
  ])
})

test("nothing carried in shows six empty rings rather than an empty list", async () => {
  const some = await tile.drawn()
  expect(some.length).toBe(6)
  for (const one of some) {
    expect(one.readingHeld).toBe("none")
    expect(one.reading).toBe("")
    expect(one.tier).toBe("black")
  }
})

test("all six attributes come back when all six have been carried in", async () => {
  carryAll()
  expect((await tile.drawn()).length).toBe(6)
})

test("every stoplight carries its key under `attribute` rather than under `habit`", async () => {
  carryAll()
  for (const one of await tile.drawn()) {
    expect(Object.keys(one)).toContain("attribute")
    expect(Object.keys(one)).not.toContain("habit")
  }
})

test("the six keys are the six the tile finds its rings under", async () => {
  carryAll()
  expect((await tile.drawn()).map((one) => one.attribute)).toEqual([
    "strength",
    "endurance",
    "constitution",
    "wisdom",
    "intelligence",
    "charisma",
  ])
})

test("the rings come back in the place order the readout pages state", async () => {
  carryAll()
  expect((await tile.drawn()).map((one) => one.label)).toEqual([
    "Strength",
    "Endurance",
    "Constitution",
    "Wisdom",
    "Intelligence",
    "Charisma",
  ])
})

test("an attribute with no fresh reading keeps its ring rather than leaving the tile short", async () => {
  relayedFor("attribute-strength", 1.4)
  const some = await tile.drawn()
  expect(some.length).toBe(6)
  expect((await tile.ringFor("strength"))?.reading).toBe("1.4")
  expect((await tile.ringFor("strength"))?.readingHeld).toBeUndefined()
  expect((await tile.ringFor("charisma"))?.reading).toBe("")
  expect((await tile.ringFor("charisma"))?.readingHeld).toBe("none")
})

test("every stoplight carries a tier that is one of the six colors the phone reads", async () => {
  carryAll()
  for (const one of await tile.drawn()) {
    expect(TIERS).toContain(colorIn(one, "tier"))
    if (one.nextTier !== undefined) expect(TIERS).toContain(colorIn(one, "nextTier"))
  }
})

test("a climbing scale colors a rising figure better rather than worse", async () => {
  carryAll()
  expect((await tile.ringFor("intelligence"))?.tier).toBe("red")
  expect((await tile.ringFor("charisma"))?.tier).toBe("yellow")
  expect((await tile.ringFor("strength"))?.tier).toBe("green")
  expect((await tile.ringFor("constitution"))?.tier).toBe("blue")
})

test("an attribute past its best rung is blue, with no tier above it", async () => {
  carryAll()
  const one = await tile.ringFor("constitution")
  expect(one?.tier).toBe("blue")
  expect(one?.reading).toBe("2.3")
  expect(one?.nextTier).toBeUndefined()
  expect(one?.progress).toBeUndefined()
})

test("an attribute at the black rung is black with red above it and none of its band climbed", async () => {
  relayedFor("attribute-wisdom", 0)
  const one = await tile.ringFor("wisdom")
  expect(one?.tier).toBe("black")
  expect(one?.reading).toBe("0")
  expect(one?.nextTier).toBe("red")
  expect(one?.progress).toBe(0)
})

test("an attribute under the first rung the scale states climbs toward that rung", async () => {
  relayedFor("attribute-endurance", 0.17)
  const one = await tile.ringFor("endurance")
  expect(one?.tier).toBe("black")
  expect(one?.reading).toBe("0.17")
  expect(one?.nextTier).toBe("red")
  expect(one?.progress).toBeCloseTo(0.68, 12)
})

test("a figure of zero and a figure never carried are told apart on the wire", async () => {
  relayedFor("attribute-wisdom", 0)
  const carried = await tile.ringFor("wisdom")
  expect(carried?.reading).toBe("0")
  expect(carried?.readingHeld).toBeUndefined()

  const absent = await tile.ringFor("intelligence")
  expect(absent?.reading).toBe("")
  expect(absent?.readingHeld).toBe("none")
})

test("the tier a rising figure is next to reach is the better one", async () => {
  carryAll()
  expect((await tile.ringFor("endurance"))?.nextTier).toBe("green")
  expect((await tile.ringFor("strength"))?.nextTier).toBe("blue")
})

test("how far a rising figure has come is the fraction of its band it has climbed", async () => {
  carryAll()
  expect((await tile.ringFor("endurance"))?.progress).toBeCloseTo(0.5, 12)
  expect((await tile.ringFor("strength"))?.progress).toBeCloseTo(0.4, 12)
  expect((await tile.ringFor("intelligence"))?.progress).toBeCloseTo(0.2, 12)
})

test("a figure reaches the tile as a string, which is what the tile reads", async () => {
  carryAll()
  for (const one of await tile.drawn()) expect(typeof one.reading).toBe("string")
})

test("a figure is floored to two significant figures at least", async () => {
  relayedFor("attribute-strength", 1.23456)
  expect((await tile.ringFor("strength"))?.reading).toBe("1.2")
  relayedFor("attribute-endurance", 1.5)
  expect((await tile.ringFor("endurance"))?.reading).toBe("1.5")
  relayedFor("attribute-wisdom", 0.10708)
  expect((await tile.ringFor("wisdom"))?.reading).toBe("0.10")
})

test("a reading past forty-five minutes shows an empty ring rather than the figure it held", async () => {
  carryAll(new Date(Date.now() - 46 * 60_000))
  const some = await tile.drawn()
  expect(some.length).toBe(6)
  for (const one of some) {
    expect(one.readingHeld).toBe("stale")
    expect(one.reading).toBe("")
  }
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  carryAll()
  expect((await tile.answer()).headers.get("Cache-Control")).toBe("no-store")
})
