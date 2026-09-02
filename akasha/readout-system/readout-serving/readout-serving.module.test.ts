import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { RING_CREDENTIAL_HEADER } from "../readout-credential/readout-credential.module.code.ts"
import { dropRelayed, holdRelayed } from "../readout-relay/readout-relay.module.code.ts"
import { relayedFor } from "../readout-relay/readout-relay.module.test-fixtures.ts"
import {
  answerReadout,
  answerReadoutAdmittedBy,
  readingHeldOn,
  relayedFresh,
} from "./readout-serving.module.code.ts"

const CREDENTIAL = "a-ring-credential-named-only-in-this-test"

const READOUT = "a-readout-named-only-in-this-test"

const SCALE = "a-scale-named-only-in-this-test"

const WIRE_KEY = "unreviewed"

const TAKEN = "2026-08-31T12:00:00.000Z"

let store: ReturnType<typeof Bun.serve>
let server: ReturnType<typeof Bun.serve>
let origin: string

const READOUT_ROW = {
  slug: READOUT,
  wireKey: WIRE_KEY,
  scaleSlug: SCALE,
  noneLeftWords: "All reviewed!",
  noneLeftEmoji: "🎉",
}

const SCALE_ROW = { slug: SCALE, yellowAt: 1, orangeAt: 11, redAt: 21, blackAt: 31 }

const ANSWERED: { rows: readonly Record<string, unknown>[] } = { rows: [READOUT_ROW] }

beforeAll(() => {
  store = Bun.serve({
    port: 0,
    fetch: async (request) => {
      const asked = (await request.json()) as { pageTypeSlug: string }
      if (asked.pageTypeSlug === "readout") return Response.json({ rows: ANSWERED.rows })
      return Response.json({ rows: [SCALE_ROW] })
    },
  })
  process.env.PAGES_SERVICE_ORIGIN = `http://localhost:${store.port}`
  server = Bun.serve({
    port: 0,
    fetch: (request) => answerReadout(request, CREDENTIAL, READOUT),
  })
  origin = `http://localhost:${server.port}`
})

afterAll(() => {
  server.stop()
  store.stop()
})

beforeEach(() => {
  dropRelayed()
  ANSWERED.rows = [READOUT_ROW]
})

const ring = (credential?: string) =>
  fetch(origin, {
    headers: credential === undefined ? {} : { [RING_CREDENTIAL_HEADER]: credential },
  })

test("a caller holding no credential is refused", async () => {
  expect((await ring()).status).toBe(401)
  expect((await ring("some-other-credential")).status).toBe(401)
})

test("a site naming no credential admits nobody", async () => {
  const answered = await answerReadout(new Request(origin), undefined, READOUT)
  expect(answered.status).toBe(401)
})

test("a readout with nothing carried in says there is no reading", async () => {
  const answered = await ring(CREDENTIAL)
  expect(answered.status).toBe(503)
  expect(await answered.json()).toEqual({ ok: false, error: "No reading." })
})

test("the reading carried in is the count answered out", async () => {
  relayedFor(READOUT, 41)
  const answered = await ring(CREDENTIAL)
  expect(answered.status).toBe(200)
  expect(((await answered.json()) as Record<string, unknown>)[WIRE_KEY]).toBe(41)
})

test("a reading of nothing is answered as a count rather than as none", async () => {
  relayedFor(READOUT, 0)
  const answered = await ring(CREDENTIAL)
  expect(answered.status).toBe(200)
  expect(((await answered.json()) as Record<string, unknown>)[WIRE_KEY]).toBe(0)
})

test("a reading arriving replaces the one answered before it", async () => {
  relayedFor(READOUT, 41)
  relayedFor(READOUT, 8)
  const body = (await (await ring(CREDENTIAL)).json()) as Record<string, unknown>
  expect(body[WIRE_KEY]).toBe(8)
})

test("the key a reading is answered under is read off the readout's page", async () => {
  relayedFor(READOUT, 41)
  ANSWERED.rows = [{ ...READOUT_ROW, wireKey: "waiting" }]
  const body = (await (await ring(CREDENTIAL)).json()) as Record<string, unknown>
  expect(body.waiting).toBe(41)
  expect(body[WIRE_KEY]).toBe(undefined)
})

test("the rungs and the none-left words are read from the store rather than carried", async () => {
  relayedFor(READOUT, 41)
  const body = (await (await ring(CREDENTIAL)).json()) as Record<string, unknown>
  expect(body.scale).toEqual({ orangeAt: 11, redAt: 21, blackAt: 31, yellowAt: 1 })
  expect(body.noneLeftWords).toBe("All reviewed!")
  expect(body.noneLeftEmoji).toBe("🎉")
})

test("a readout naming no scale is answered without rungs", async () => {
  relayedFor(READOUT, 41)
  ANSWERED.rows = [{ slug: READOUT, wireKey: WIRE_KEY }]
  const body = (await (await ring(CREDENTIAL)).json()) as Record<string, unknown>
  expect(body[WIRE_KEY]).toBe(41)
  expect(body.scale).toBe(undefined)
  expect(body.noneLeftWords).toBe(undefined)
})

test("a readout whose page cannot be read is answered as none", async () => {
  relayedFor(READOUT, 41)
  ANSWERED.rows = []
  const answered = await ring(CREDENTIAL)
  expect(answered.status).toBe(503)
  expect(await answered.json()).toEqual({ ok: false, error: "No reading." })
})

test("a readout page naming no wire key is answered as none", async () => {
  relayedFor(READOUT, 41)
  ANSWERED.rows = [{ slug: READOUT }]
  expect((await ring(CREDENTIAL)).status).toBe(503)
})

test("a reading past forty-five minutes is no reading", async () => {
  relayedFor(READOUT, 99, new Date(Date.now() - 46 * 60_000))
  expect((await ring(CREDENTIAL)).status).toBe(503)
})

test("a reading inside forty-five minutes is still a reading", async () => {
  relayedFor(READOUT, 99, new Date(Date.now() - 44 * 60_000))
  expect((await ring(CREDENTIAL)).status).toBe(200)
})

test("a machine that starts again holds no reading", async () => {
  relayedFor(READOUT, 41)
  dropRelayed()
  expect((await ring(CREDENTIAL)).status).toBe(503)
})

test("the moment a reading is judged against is handed in rather than read here", () => {
  holdRelayed({ readout: READOUT, value: 19, at: TAKEN })
  expect(relayedFresh(READOUT, new Date("2026-08-31T12:44:00.000Z"))).toBe(19)
  expect(relayedFresh(READOUT, new Date("2026-08-31T12:46:00.000Z"))).toBeNull()
})

test("a reading carried on a readout's own row is read as a reading", () => {
  const held = readingHeldOn(
    { lastValue: 19, lastValueAt: TAKEN },
    new Date("2026-08-31T12:44:00.000Z")
  )
  expect(held).toEqual({ held: "fresh", value: 19 })
})

test("a reading carried on a row is aged by the window a relayed reading is aged by", () => {
  const values = { lastValue: 19, lastValueAt: TAKEN }
  expect(readingHeldOn(values, new Date("2026-08-31T12:44:00.000Z")).held).toBe("fresh")
  expect(readingHeldOn(values, new Date("2026-08-31T12:46:00.000Z")).held).toBe("stale")
})

test("a row carrying no reading is told from a row whose reading is too old", () => {
  expect(readingHeldOn({ slug: READOUT }, new Date(TAKEN)).held).toBe("none")
  expect(
    readingHeldOn({ lastValue: 19, lastValueAt: TAKEN }, new Date("2026-08-31T13:00:00.000Z")).held
  ).toBe("stale")
})

test("a reading of nothing carried on a row is a reading rather than an absence", () => {
  const held = readingHeldOn(
    { lastValue: 0, lastValueAt: TAKEN },
    new Date("2026-08-31T12:01:00.000Z")
  )
  expect(held).toEqual({ held: "fresh", value: 0 })
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  relayedFor(READOUT, 41)
  expect((await ring(CREDENTIAL)).headers.get("Cache-Control")).toBe("no-store")
  dropRelayed()
  expect((await ring(CREDENTIAL)).headers.get("Cache-Control")).toBe("no-store")
  expect((await ring()).headers.get("Cache-Control")).toBe("no-store")
})

test("a guard handed in decides who is admitted", async () => {
  relayedFor(READOUT, 41)
  const admitted = await answerReadoutAdmittedBy(new Request(origin), () => null, READOUT)
  expect(admitted.status).toBe(200)
  expect(((await admitted.json()) as Record<string, unknown>)[WIRE_KEY]).toBe(41)
})

test("a refusal a guard answers is served whole rather than made again here", async () => {
  relayedFor(READOUT, 41)
  const refused = await answerReadoutAdmittedBy(
    new Request(origin),
    () => new Response("held back", { status: 403, headers: { "X-Said-By": "the guard" } }),
    READOUT
  )
  expect(refused.status).toBe(403)
  expect(refused.headers.get("X-Said-By")).toBe("the guard")
  expect(await refused.text()).toBe("held back")
})

test("a guard answering only in time is waited for", async () => {
  relayedFor(READOUT, 41)
  const admitted = await answerReadoutAdmittedBy(
    new Request(origin),
    async () => {
      await Promise.resolve()
      return null
    },
    READOUT
  )
  expect(admitted.status).toBe(200)
  const refused = await answerReadoutAdmittedBy(
    new Request(origin),
    async () => {
      await Promise.resolve()
      return new Response("held back", { status: 403 })
    },
    READOUT
  )
  expect(refused.status).toBe(403)
})

test("a guard admitting a caller with no reading behind it still says there is none", async () => {
  const answered = await answerReadoutAdmittedBy(new Request(origin), () => null, READOUT)
  expect(answered.status).toBe(503)
  expect(answered.headers.get("Cache-Control")).toBe("no-store")
})
