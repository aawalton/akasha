import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import {
  dropRelayed,
  RELAY_PATH,
  relayReading,
} from "akasha/readouts/relay/readout-relay.module.code.ts"
import { action } from "../jenny-readout-relay/jenny-readout-relay.route.code.ts"
import { loader } from "./jenny-cost.route.code.ts"

const RING_CREDENTIAL = crypto.randomUUID()
const RELAY_SECRET = crypto.randomUUID()
const COST = "cost-multiplier"
const SURPLUS = "upkeep-surplus"
const PATH = "/api/cost"

process.env.SMILINGJENNY_RING_CREDENTIAL = RING_CREDENTIAL
process.env.READING_RELAY_SECRET = RELAY_SECRET

const TIERS = ["black", "red", "orange", "yellow", "green", "blue"]

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

const ANSWERED: { readouts: readonly Record<string, unknown>[] } = {
  readouts: [COST_ROW, SURPLUS_ROW],
}

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
  ANSWERED.readouts = [COST_ROW, SURPLUS_ROW]
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

const carryNow = async (multiplier: number, hours: number): Promise<undefined> => {
  await carried(COST, multiplier)
  await carried(SURPLUS, hours)
  return undefined
}

async function drawn(): Promise<readonly Stoplight[]> {
  const answered = await tile()
  expect(answered.status).toBe(200)
  const body = (await answered.json()) as { stoplights: readonly Stoplight[] }
  return body.stoplights
}

test("a caller holding no ring credential is refused", async () => {
  await carryNow(0.5, 5)
  expect((await tile(null)).status).toBe(401)
  expect((await tile(crypto.randomUUID())).status).toBe(401)
})

test("the widget's body is a non-empty list under `stoplights`", async () => {
  await carryNow(0.5, 5)
  const stoplights = await drawn()
  expect(Array.isArray(stoplights)).toBe(true)
  expect(stoplights.length).toBeGreaterThan(0)
})

test("nothing carried in shows an empty ring rather than a cost of zero", async () => {
  const [one] = await drawn()
  expect(one?.readingHeld).toBe("none")
  expect(one?.reading).toBe("")
  expect(one?.tier).toBe("black")
  expect(one?.label).toBe("Cost")
})

test("the cost is colored with the surplus carried in beside it", async () => {
  await carryNow(0.5, 5)
  expect((await drawn())[0]?.tier).toBe("yellow")
  dropRelayed()
  await carryNow(0.5, 1)
  expect((await drawn())[0]?.tier).toBe("red")
})

test("a cost above one is black whatever the surplus is", async () => {
  await carryNow(1.5, 5)
  expect((await drawn())[0]?.tier).toBe("black")
})

test("a cost of nothing is green whatever the surplus is", async () => {
  await carryNow(0, -20)
  expect((await drawn())[0]?.tier).toBe("green")
})

test("every stoplight carries a tier that is one of the six colors the phone decodes", async () => {
  for (const multiplier of [0, 0.5, 1, 1.5, 32]) {
    dropRelayed()
    await carryNow(multiplier, 5)
    for (const one of await drawn()) {
      expect(TIERS).toContain(one.tier)
    }
  }
})

test("the label and the key are read off the readout's page rather than named in the route", async () => {
  await carryNow(0.5, 5)
  const [one] = await drawn()
  expect(one?.label).toBe("Cost")
  expect(one?.habit).toBe("cost")

  ANSWERED.readouts = [{ ...COST_ROW, label: "What it costs" }, SURPLUS_ROW]
  expect((await drawn())[0]?.label).toBe("What it costs")
})

test("the reading is a string, which is what the widget decodes", async () => {
  await carryNow(0.5, 5)
  expect(typeof (await drawn())[0]?.reading).toBe("string")
})

test("a cost past forty-five minutes shows an empty ring rather than what it held", async () => {
  await carried(COST, 0.5, new Date(Date.now() - 46 * 60_000))
  await carried(SURPLUS, 5)
  const [one] = await drawn()
  expect(one?.readingHeld).toBe("stale")
  expect(one?.reading).toBe("")
})

test("a machine that starts again holds no reading, and says so rather than losing the ring", async () => {
  await carryNow(0.5, 5)
  dropRelayed()
  const [one] = await drawn()
  expect(one?.readingHeld).toBe("none")
  expect(one?.reading).toBe("")
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  await carryNow(0.5, 5)
  expect((await tile()).headers.get("Cache-Control")).toBe("no-store")
  dropRelayed()
  expect((await tile()).headers.get("Cache-Control")).toBe("no-store")
})
