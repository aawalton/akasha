import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import {
  dropRelayed,
  RELAY_PATH,
  relayReading,
} from "akasha/alan/harness/readouts/relay/readout-relay.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"
import { action } from "../jenny-readout-relay/jenny-readout-relay.route.code.ts"
import { loader } from "./jenny-upkeep.route.code.ts"

const RING_CREDENTIAL = crypto.randomUUID()
const RELAY_SECRET = crypto.randomUUID()
const GROUP = "upkeep"
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
  scale: "safety-level",
  wireKey: "safety",
  groups: [GROUP, "safety"],
}

const SURPLUS_ROW = {
  slug: SURPLUS,
  label: "Surplus",
  place: 2,
  scale: "surplus-hours",
  wireKey: "surplus",
  groups: [GROUP, "surplus"],
}

const CAPACITY_ROW = {
  slug: CAPACITY,
  label: "Capacity",
  place: 3,
  scale: "capacity-hours",
  wireKey: "capacity",
  groups: [GROUP],
}

const SLEEP_ROW = {
  slug: SLEEP,
  label: "Sleep",
  place: 6,
  scale: "sleep-hours",
  wireKey: "sleep",
  groups: [GROUP],
}

const SCALE_ROWS: readonly Record<string, unknown>[] = [
  { slug: "safety-level", redAt: 1, yellowAt: 2, greenAt: 3, blueAt: 4 },
  { slug: "surplus-hours", blackAt: -12, redAt: -8, yellowAt: -4, greenAt: 0, blueAt: 4 },
  { slug: "capacity-hours", blackAt: -4, redAt: 0, yellowAt: 4, greenAt: 8, blueAt: 12 },
  { slug: "sleep-hours", redAt: 6, yellowAt: 7, greenAt: 8, blueAt: 9 },
]

const IN_THE_GROUP = [SAFETY_ROW, SURPLUS_ROW, CAPACITY_ROW, SLEEP_ROW]

const ANSWERED: { readouts: readonly Record<string, unknown>[] } = { readouts: IN_THE_GROUP }

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
let server: ReturnType<typeof Bun.serve>
let origin: string
let heldOrigin: string | undefined

beforeAll(() => {
  store = Bun.serve({
    port: 0,
    fetch: async (request) => {
      const asked = (await request.json()) as Asked
      if (asked.pageTypeSlug === "readout") {
        return Response.json({ rows: readoutsAsked(asked.where) })
      }
      if (asked.pageTypeSlug === "readout-group") {
        return Response.json({ rows: [{ slug: GROUP }] })
      }
      const named = asked.where?.slug?.is
      return Response.json({ rows: SCALE_ROWS.filter((row) => row.slug === named) })
    },
  })
  heldOrigin = optionalEnv("PAGES_SERVICE_ORIGIN")
  process.env.PAGES_SERVICE_ORIGIN = `http://localhost:${store.port}`
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
})

afterAll(() => {
  server.stop()
  store.stop(true)
  if (heldOrigin === undefined) delete process.env.PAGES_SERVICE_ORIGIN
  else process.env.PAGES_SERVICE_ORIGIN = heldOrigin
})

beforeEach(() => {
  dropRelayed()
  ANSWERED.readouts = IN_THE_GROUP
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

const tile = (credential: string | null = RING_CREDENTIAL) =>
  fetch(`${origin}${PATH}`, {
    headers: credential === null ? {} : { "X-Ring-Credential": credential },
  })

const carried = (readout: string, value: number, at: Date = new Date()) =>
  relayReading(origin, RELAY_SECRET, { readout, value, at: at.toISOString() })

const carryNow = async (at: Date = new Date()): Promise<undefined> => {
  await carried(SAFETY, 3, at)
  await carried(SURPLUS, 5, at)
  await carried(CAPACITY, 6, at)
  await carried(SLEEP, 6.5, at)
  return undefined
}

async function drawn(): Promise<readonly Stoplight[]> {
  const answered = await tile()
  expect(answered.status).toBe(200)
  const body = (await answered.json()) as { stoplights: readonly Stoplight[] }
  return body.stoplights
}

test("a caller holding no ring credential is refused", async () => {
  await carryNow()
  expect((await tile(null)).status).toBe(401)
  expect((await tile(crypto.randomUUID())).status).toBe(401)
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
    expect(TIERS).toContain(one.tier)
    if (one.nextTier !== undefined) expect(TIERS).toContain(one.nextTier)
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
      scale: "safety-level",
      wireKey: "plants",
      groups: [GROUP],
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
      scale: "safety-level",
      wireKey: "cost",
      groups: ["cost"],
    },
  ]
  expect((await drawn()).map((one) => one.habit)).not.toContain("cost")
})

test("the reading is a string, which is what the widget decodes", async () => {
  await carryNow()
  for (const one of await drawn()) expect(typeof one.reading).toBe("string")
})

test("a reading past forty-five minutes shows an empty ring rather than what it held", async () => {
  await carryNow(new Date(Date.now() - 46 * 60_000))
  for (const one of await drawn()) {
    expect(one.readingHeld).toBe("stale")
    expect(one.reading).toBe("")
  }
})

test("a machine that starts again holds no reading, and says so rather than losing the rings", async () => {
  await carryNow()
  dropRelayed()
  const stoplights = await drawn()
  expect(stoplights.length).toBe(4)
  for (const one of stoplights) expect(one.readingHeld).toBe("none")
})

test("only a group no readout is left in answers 503", async () => {
  await carryNow()
  expect((await tile()).status).toBe(200)
  ANSWERED.readouts = []
  expect((await tile()).status).toBe(503)
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  await carryNow()
  expect((await tile()).headers.get("Cache-Control")).toBe("no-store")
  dropRelayed()
  expect((await tile()).headers.get("Cache-Control")).toBe("no-store")
})
