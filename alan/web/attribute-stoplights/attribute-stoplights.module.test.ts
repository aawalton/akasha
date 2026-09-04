import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { join } from "node:path"
import { answerStoplightsAdmittedBy } from "@akasha/readout-system/readout-group-serving"
import { dropRelayed, holdRelayed } from "@akasha/readout-system/readout-relay"
import { Glob } from "bun"
import { GROUP, WIRE_KEY_NAME } from "./attribute-stoplights.module.code.ts"

globalThis.Response = (await fetch("data:text/plain,")).constructor as typeof Response

const TIERS = ["black", "red", "orange", "yellow", "green", "blue"]

const READOUT_ROWS = [
  {
    slug: "attribute-strength",
    label: "Strength",
    unit: "points",
    place: 1,
    figureFormat: "decimal",
    scaleSlug: "attribute-points",
    wireKey: "strength",
    groupSlugs: [GROUP],
  },
  {
    slug: "attribute-endurance",
    label: "Endurance",
    unit: "points",
    place: 2,
    figureFormat: "decimal",
    scaleSlug: "attribute-points",
    wireKey: "endurance",
    groupSlugs: [GROUP],
  },
  {
    slug: "attribute-constitution",
    label: "Constitution",
    unit: "points",
    place: 3,
    figureFormat: "decimal",
    scaleSlug: "attribute-points",
    wireKey: "constitution",
    groupSlugs: [GROUP],
  },
  {
    slug: "attribute-wisdom",
    label: "Wisdom",
    unit: "points",
    place: 4,
    figureFormat: "decimal",
    scaleSlug: "attribute-points",
    wireKey: "wisdom",
    groupSlugs: [GROUP],
  },
  {
    slug: "attribute-intelligence",
    label: "Intelligence",
    unit: "points",
    place: 5,
    figureFormat: "decimal",
    scaleSlug: "attribute-points",
    wireKey: "intelligence",
    groupSlugs: [GROUP],
  },
  {
    slug: "attribute-charisma",
    label: "Charisma",
    unit: "points",
    place: 6,
    figureFormat: "decimal",
    scaleSlug: "attribute-points",
    wireKey: "charisma",
    groupSlugs: [GROUP],
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
let origin: string

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
  process.env.PAGES_SERVICE_ORIGIN = `http://localhost:${store.port}`
  server = Bun.serve({
    port: 0,
    fetch(request) {
      const { pathname } = new URL(request.url)
      if (pathname === "/api/attribute-stoplights") {
        return answerStoplightsAdmittedBy(request, () => null, GROUP, WIRE_KEY_NAME)
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
  ANSWERED.readouts = READOUT_ROWS
})

type Stoplight = Record<string, unknown>

function colorIn(one: Stoplight, key: string): string {
  const held = one[key]
  if (typeof held !== "string") {
    throw new Error(`a stoplight carries no text under \`${key}\`: ${JSON.stringify(held)}`)
  }
  return held
}

const tile = () => fetch(`${origin}/api/attribute-stoplights`)

function carryNow(readout: string, value: number, at: Date = new Date()): undefined {
  holdRelayed({ readout, value, at: at.toISOString() })
}

function carryAll(at: Date = new Date()): undefined {
  for (const [readout, value] of CARRIED) carryNow(readout, value, at)
}

async function drawn(): Promise<readonly Stoplight[]> {
  const answered = await tile()
  expect(answered.status).toBe(200)
  const body = (await answered.json()) as { stoplights: readonly Stoplight[] }
  return body.stoplights
}

async function ringFor(attribute: string): Promise<Stoplight | undefined> {
  return (await drawn()).find((one) => one.attribute === attribute)
}

const AKASHA = join(import.meta.dir, "..", "..", "..")

async function readoutsNamingAttributes(): Promise<readonly string[]> {
  const named: string[] = []
  for await (const relative of new Glob("**/*.readout.ts").scan({ cwd: AKASHA })) {
    if (relative.includes("node_modules")) continue
    const loaded = (await import(join(AKASHA, relative))) as Record<
      string,
      { slug?: string; groupSlugs?: readonly string[] } | undefined
    >
    for (const one of Object.values(loaded)) {
      if (one?.slug === undefined) continue
      if (one.groupSlugs?.includes(GROUP) === true) named.push(one.slug)
    }
  }
  return named.sort()
}

test("the group this answers for is the attributes group", () => {
  expect(GROUP).toBe("attributes")
})

test("the key a reading travels under is `attribute` rather than `habit`", () => {
  expect(WIRE_KEY_NAME).toBe("attribute")
})

test("the pages naming the attributes group are the six the fixture holds", async () => {
  expect(await readoutsNamingAttributes()).toEqual([
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
    ...(await readoutsNamingAttributes()),
  ])
})

test("nothing carried in shows six empty rings rather than an empty list", async () => {
  const some = await drawn()
  expect(some.length).toBe(6)
  for (const one of some) {
    expect(one.readingHeld).toBe("none")
    expect(one.reading).toBe("")
    expect(one.tier).toBe("black")
  }
})

test("all six attributes come back when all six have been carried in", async () => {
  carryAll()
  expect((await drawn()).length).toBe(6)
})

test("every stoplight carries its key under `attribute` rather than under `habit`", async () => {
  carryAll()
  for (const one of await drawn()) {
    expect(Object.keys(one)).toContain("attribute")
    expect(Object.keys(one)).not.toContain("habit")
  }
})

test("the six keys are the six the tile finds its rings under", async () => {
  carryAll()
  expect((await drawn()).map((one) => one.attribute)).toEqual([
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
  expect((await drawn()).map((one) => one.label)).toEqual([
    "Strength",
    "Endurance",
    "Constitution",
    "Wisdom",
    "Intelligence",
    "Charisma",
  ])
})

test("an attribute with no fresh reading keeps its ring rather than leaving the tile short", async () => {
  carryNow("attribute-strength", 1.4)
  const some = await drawn()
  expect(some.length).toBe(6)
  expect((await ringFor("strength"))?.reading).toBe("1.4")
  expect((await ringFor("strength"))?.readingHeld).toBeUndefined()
  expect((await ringFor("charisma"))?.reading).toBe("")
  expect((await ringFor("charisma"))?.readingHeld).toBe("none")
})

test("every stoplight carries a tier that is one of the six colors the phone reads", async () => {
  carryAll()
  for (const one of await drawn()) {
    expect(TIERS).toContain(colorIn(one, "tier"))
    if (one.nextTier !== undefined) expect(TIERS).toContain(colorIn(one, "nextTier"))
  }
})

test("a climbing scale colors a rising figure better rather than worse", async () => {
  carryAll()
  expect((await ringFor("intelligence"))?.tier).toBe("red")
  expect((await ringFor("charisma"))?.tier).toBe("yellow")
  expect((await ringFor("strength"))?.tier).toBe("green")
  expect((await ringFor("constitution"))?.tier).toBe("blue")
})

test("an attribute past its best rung is blue, with no tier above it", async () => {
  carryAll()
  const one = await ringFor("constitution")
  expect(one?.tier).toBe("blue")
  expect(one?.reading).toBe("2.3")
  expect(one?.nextTier).toBeUndefined()
  expect(one?.progress).toBeUndefined()
})

test("an attribute under every rung is black with red above it and no fraction climbed", async () => {
  carryNow("attribute-wisdom", 0)
  const one = await ringFor("wisdom")
  expect(one?.tier).toBe("black")
  expect(one?.reading).toBe("0")
  expect(one?.nextTier).toBe("red")
  expect(one?.progress).toBeUndefined()
})

test("a figure of zero and a figure never carried are told apart on the wire", async () => {
  carryNow("attribute-wisdom", 0)
  const carried = await ringFor("wisdom")
  expect(carried?.reading).toBe("0")
  expect(carried?.readingHeld).toBeUndefined()

  const absent = await ringFor("intelligence")
  expect(absent?.reading).toBe("")
  expect(absent?.readingHeld).toBe("none")
})

test("the tier a rising figure is next to reach is the better one", async () => {
  carryAll()
  expect((await ringFor("endurance"))?.nextTier).toBe("green")
  expect((await ringFor("strength"))?.nextTier).toBe("blue")
})

test("how far a rising figure has come is the fraction of its band it has climbed", async () => {
  carryAll()
  expect((await ringFor("endurance"))?.progress).toBeCloseTo(0.5, 12)
  expect((await ringFor("strength"))?.progress).toBeCloseTo(0.4, 12)
  expect((await ringFor("intelligence"))?.progress).toBeCloseTo(0.2, 12)
})

test("a figure reaches the tile as a string, which is what the tile reads", async () => {
  carryAll()
  for (const one of await drawn()) expect(typeof one.reading).toBe("string")
})

test("a figure is written to two places at most, with trailing zeros dropped", async () => {
  carryNow("attribute-strength", 1.23456)
  expect((await ringFor("strength"))?.reading).toBe("1.23")
  carryNow("attribute-endurance", 1.5)
  expect((await ringFor("endurance"))?.reading).toBe("1.5")
})

test("a reading past forty-five minutes shows an empty ring rather than the figure it held", async () => {
  carryAll(new Date(Date.now() - 46 * 60_000))
  const some = await drawn()
  expect(some.length).toBe(6)
  for (const one of some) {
    expect(one.readingHeld).toBe("stale")
    expect(one.reading).toBe("")
  }
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  carryAll()
  expect((await tile()).headers.get("Cache-Control")).toBe("no-store")
})
