import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test"
import { RING_CREDENTIAL_HEADER } from "../readout-credential/readout-credential.module.code.ts"
import { dropRelayed, holdRelayed } from "../readout-relay/readout-relay.module.code.ts"
import {
  answerCategorization,
  UNREVIEWED_READOUT,
  unreviewedRelayed,
} from "./readout-categorization.module.code.ts"

const CREDENTIAL = "a-ring-credential-standing-only-in-this-test"

const TAKEN = "2026-08-31T12:00:00.000Z"

let server: ReturnType<typeof Bun.serve>
let origin: string

beforeAll(() => {
  server = Bun.serve({
    port: 0,
    fetch: (request) => answerCategorization(request, CREDENTIAL),
  })
  origin = `http://localhost:${server.port}`
})

afterAll(() => server.stop())

beforeEach(() => dropRelayed())

const ring = (credential?: string) =>
  fetch(origin, {
    headers: credential === undefined ? {} : { [RING_CREDENTIAL_HEADER]: credential },
  })

const carried = (value: number, at: Date = new Date()) =>
  holdRelayed({ readout: UNREVIEWED_READOUT, value, at: at.toISOString() })

test("a caller holding no credential is refused", async () => {
  expect((await ring()).status).toBe(401)
  expect((await ring("some-other-credential")).status).toBe(401)
})

test("a site naming no credential admits nobody", async () => {
  const answered = await answerCategorization(new Request(origin), undefined)
  expect(answered.status).toBe(401)
})

test("a readout with nothing carried in says there is no reading", async () => {
  const answered = await ring(CREDENTIAL)
  expect(answered.status).toBe(503)
  expect(await answered.json()).toEqual({ ok: false, error: "No reading." })
})

test("the reading carried in is the count answered out", async () => {
  carried(41)
  const answered = await ring(CREDENTIAL)
  expect(answered.status).toBe(200)
  expect(((await answered.json()) as { unreviewed: number }).unreviewed).toBe(41)
})

test("a reading of nothing is answered as a count rather than as none", async () => {
  carried(0)
  const answered = await ring(CREDENTIAL)
  expect(answered.status).toBe(200)
  expect(((await answered.json()) as { unreviewed: number }).unreviewed).toBe(0)
})

test("a reading arriving replaces the one answered before it", async () => {
  carried(41)
  carried(8)
  const body = (await (await ring(CREDENTIAL)).json()) as { unreviewed: number }
  expect(body.unreviewed).toBe(8)
})

test("the rungs and the none-left words are read from the store rather than carried", async () => {
  carried(41)
  const body = (await (await ring(CREDENTIAL)).json()) as Record<string, unknown>
  expect(body.scale).toBeDefined()
  expect(typeof body.noneLeftWords).toBe("string")
  expect(typeof body.noneLeftEmoji).toBe("string")
})

test("a reading past forty-five minutes is no reading", async () => {
  carried(99, new Date(Date.now() - 46 * 60_000))
  expect((await ring(CREDENTIAL)).status).toBe(503)
})

test("a reading inside forty-five minutes is still a reading", async () => {
  carried(99, new Date(Date.now() - 44 * 60_000))
  expect((await ring(CREDENTIAL)).status).toBe(200)
})

test("a machine that starts again holds no reading", async () => {
  carried(41)
  dropRelayed()
  expect((await ring(CREDENTIAL)).status).toBe(503)
})

test("the moment a reading is judged against is handed in rather than read here", () => {
  holdRelayed({ readout: UNREVIEWED_READOUT, value: 19, at: TAKEN })
  expect(unreviewedRelayed(new Date("2026-08-31T12:44:00.000Z"))).toBe(19)
  expect(unreviewedRelayed(new Date("2026-08-31T12:46:00.000Z"))).toBeNull()
})

test("nothing between here and the tile is allowed to keep an answer", async () => {
  carried(41)
  expect((await ring(CREDENTIAL)).headers.get("Cache-Control")).toBe("no-store")
  dropRelayed()
  expect((await ring(CREDENTIAL)).headers.get("Cache-Control")).toBe("no-store")
  expect((await ring()).headers.get("Cache-Control")).toBe("no-store")
})
