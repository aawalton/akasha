// Jenny's ring, driven over real HTTP: the relay carrier POSTs a reading into her
// receiving route and her categorization route serves it. The two secrets are the
// only made-up things here, generated fresh for each run.
import { afterAll, beforeAll, expect, test } from "bun:test"
import { dropRelayed, RELAY_PATH, relayReading } from "@akasha/readout-system/readout-relay"
import { loader } from "./api.categorization.ts"
import { action } from "./api.readout-relay.ts"

const RING_CREDENTIAL = crypto.randomUUID()
const RELAY_SECRET = crypto.randomUUID()
const UNREVIEWED = "monarch-unreviewed-transactions"

process.env.SMILINGJENNY_RING_CREDENTIAL = RING_CREDENTIAL
process.env.READING_RELAY_SECRET = RELAY_SECRET

const READOUT_ROW = {
  slug: UNREVIEWED,
  wireKey: "unreviewed",
  scaleSlug: "backlog-count",
  noneLeftWords: "All reviewed!",
  noneLeftEmoji: "\u{1F389}",
}

const SCALE_ROW = { slug: "backlog-count", yellowAt: 1, orangeAt: 11, redAt: 21, blackAt: 31 }

let store: ReturnType<typeof Bun.serve>
let server: ReturnType<typeof Bun.serve>
let origin: string

beforeAll(() => {
  store = Bun.serve({
    port: 0,
    fetch: async (request) => {
      const asked = (await request.json()) as { pageTypeSlug: string }
      if (asked.pageTypeSlug === "readout") return Response.json({ rows: [READOUT_ROW] })
      return Response.json({ rows: [SCALE_ROW] })
    },
  })
  process.env.PAGES_SERVICE_ORIGIN = `http://localhost:${store.port}`
  server = Bun.serve({
    port: 0,
    fetch(request) {
      const { pathname } = new URL(request.url)
      if (pathname === "/api/categorization") return loader({ request } as never)
      if (pathname === RELAY_PATH) return action({ request } as never)
      return new Response("no such route", { status: 404 })
    },
  })
  origin = `http://localhost:${server.port}`
})

afterAll(() => {
  server.stop()
  store.stop()
})

const ring = (credential?: string) =>
  fetch(`${origin}/api/categorization`, {
    headers: credential === undefined ? {} : { "X-Ring-Credential": credential },
  })

const carry = (secret: string, body: unknown) =>
  fetch(`${origin}${RELAY_PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Relay-Secret": secret },
    body: JSON.stringify(body),
  })

const carryNow = (value: number, at: Date = new Date()) =>
  relayReading(origin, RELAY_SECRET, { readout: UNREVIEWED, value, at: at.toISOString() })

test("a caller holding no credential is refused", async () => {
  expect((await ring()).status).toBe(401)
  expect((await ring(crypto.randomUUID())).status).toBe(401)
})

test("a readout with nothing carried in says there is no reading", async () => {
  dropRelayed()
  const answered = await ring(RING_CREDENTIAL)
  expect(answered.status).toBe(503)
  expect(await answered.json()).toEqual({ ok: false, error: "No reading." })
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
  expect((await carry(RELAY_SECRET, { readout: UNREVIEWED, value: 7 })).status).toBe(400)
  expect((await carry(RELAY_SECRET, { readout: UNREVIEWED, value: 7, at: "soon" })).status).toBe(
    400
  )
})

test("the reading carried in is the count served out", async () => {
  dropRelayed()
  await carryNow(41)
  const answered = await ring(RING_CREDENTIAL)
  expect(answered.status).toBe(200)
  expect(((await answered.json()) as { unreviewed: number }).unreviewed).toBe(41)
})

test("the rungs and the none-left words are read from the store rather than carried", async () => {
  dropRelayed()
  await carryNow(41)
  const body = (await (await ring(RING_CREDENTIAL)).json()) as Record<string, unknown>
  expect(body.scale).toBeDefined()
  expect(typeof body.noneLeftWords).toBe("string")
  expect(typeof body.noneLeftEmoji).toBe("string")
})

test("a reading arriving replaces the one held before it", async () => {
  dropRelayed()
  await carryNow(41)
  await carryNow(8)
  const body = (await (await ring(RING_CREDENTIAL)).json()) as { unreviewed: number }
  expect(body.unreviewed).toBe(8)
})

test("a reading past forty-five minutes is no reading", async () => {
  dropRelayed()
  await carryNow(99, new Date(Date.now() - 46 * 60_000))
  expect((await ring(RING_CREDENTIAL)).status).toBe(503)
})

test("a machine that starts again holds no reading", async () => {
  await carryNow(41)
  dropRelayed()
  expect((await ring(RING_CREDENTIAL)).status).toBe(503)
})
