import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { z } from "zod"
import { fetchRingCountsFromRoute } from "./ring-relay"

const ROUTE = "https://alanwalton.com/api/categorization"
const COUNTS = { unreviewed: 12, total: 400, intake: 33 }
const RELAY_SECRET = "relay-secret-under-nobodys-user-id"
const OLD_DEVICE_SECRET = "dsk_the-credential-this-relay-no-longer-walks"

const optionalEnv = z.string().optional()

const realFetch = globalThis.fetch
const realRelaySecret = optionalEnv.parse(process.env.SMILINGJENNY_RELAY_SECRET)
const realDeviceSecret = optionalEnv.parse(process.env.ALANWALTON_RING_DEVICE_SECRET)

let sent: Headers | null = null
let answer: () => Response = () => Response.json(COUNTS)

beforeEach(() => {
  sent = null
  answer = () => Response.json(COUNTS)
  globalThis.fetch = async (_input, init) => {
    sent = new Headers(init?.headers)
    return answer()
  }
  process.env.SMILINGJENNY_RELAY_SECRET = RELAY_SECRET
  process.env.ALANWALTON_RING_DEVICE_SECRET = OLD_DEVICE_SECRET
})

afterEach(() => {
  globalThis.fetch = realFetch
  restore("SMILINGJENNY_RELAY_SECRET", realRelaySecret)
  restore("ALANWALTON_RING_DEVICE_SECRET", realDeviceSecret)
})

function restore(name: string, value: string | undefined): undefined {
  if (value === undefined) delete process.env[name]
  else process.env[name] = value
}

function headersSent(): Headers {
  if (sent === null) throw new Error("the relay made no request")
  return sent
}

describe("the credential the relay presents", () => {
  test("travels as X-Relay-Secret and carries SMILINGJENNY_RELAY_SECRET", async () => {
    await fetchRingCountsFromRoute(ROUTE)
    expect(headersSent().get("X-Relay-Secret")).toBe(RELAY_SECRET)
  })

  test("is not a device secret: no X-Device-Secret header goes out at all", async () => {
    await fetchRingCountsFromRoute(ROUTE)
    expect(headersSent().has("X-Device-Secret")).toBe(false)
  })

  test("is never ALANWALTON_RING_DEVICE_SECRET, under any header name", async () => {
    await fetchRingCountsFromRoute(ROUTE)
    for (const [, value] of headersSent()) {
      expect(value).not.toBe(OLD_DEVICE_SECRET)
    }
  })

  test("is absent from the request when the env var is unset", async () => {
    delete process.env.SMILINGJENNY_RELAY_SECRET
    await fetchRingCountsFromRoute(ROUTE)
    expect(headersSent().has("X-Relay-Secret")).toBe(false)
    expect(headersSent().has("X-Device-Secret")).toBe(false)
  })

  test("is absent from the request when the env var is empty", async () => {
    process.env.SMILINGJENNY_RELAY_SECRET = ""
    await fetchRingCountsFromRoute(ROUTE)
    expect(headersSent().has("X-Relay-Secret")).toBe(false)
  })
})

describe("what the relay accepts as a reading", () => {
  test("returns the counts a well-formed body carries", async () => {
    expect(await fetchRingCountsFromRoute(ROUTE)).toEqual(COUNTS)
  })

  test("throws rather than relaying a body that is not a set of whole counts", async () => {
    for (const body of [
      { uncategorized: 3, total: 90, intake: 8 },
      { unreviewed: 1.5, total: 90, intake: 8 },
      { unreviewed: -1, total: 90, intake: 8 },
      { unreviewed: 3, intake: 8 },
      { unreviewed: 3, total: 90 },
    ]) {
      answer = () => Response.json(body)
      await expect(fetchRingCountsFromRoute(ROUTE)).rejects.toThrow()
    }
  })

  test("throws when the route it relays refuses", async () => {
    answer = () => new Response("no", { status: 401 })
    await expect(fetchRingCountsFromRoute(ROUTE)).rejects.toThrow()
  })
})

describe("the scale the relay carries", () => {
  const SCALE = { orangeAt: 10, redAt: 30, blackAt: 100 }

  test("reaches the far side rather than being stripped as an unknown key", async () => {
    answer = () => Response.json({ ...COUNTS, scale: SCALE })
    expect(await fetchRingCountsFromRoute(ROUTE)).toEqual({ ...COUNTS, scale: SCALE })
  })

  test("is absent from the reading when the body carries none", async () => {
    expect(await fetchRingCountsFromRoute(ROUTE)).toEqual(COUNTS)
  })

  test("carries the yellow rung rather than stripping it as an unknown key", async () => {
    const scale = { yellowAt: 0, orangeAt: 11, redAt: 21, blackAt: 31 }
    answer = () => Response.json({ ...COUNTS, scale })
    expect(await fetchRingCountsFromRoute(ROUTE)).toEqual({ ...COUNTS, scale })
  })

  test("throws rather than relaying a half-stated scale", async () => {
    for (const scale of [
      { redAt: 30, blackAt: 100 },
      { orangeAt: 10, blackAt: 100 },
      { orangeAt: 10, redAt: 30 },
      { orangeAt: 10.5, redAt: 30, blackAt: 100 },
      { orangeAt: -1, redAt: 30, blackAt: 100 },
    ]) {
      answer = () => Response.json({ ...COUNTS, scale })
      await expect(fetchRingCountsFromRoute(ROUTE)).rejects.toThrow()
    }
  })
})

describe("what a readout draws in place of a reading of nothing", () => {
  test("the words and the emoji both reach the far side rather than being stripped", async () => {
    const celebrated = { ...COUNTS, noneLeftWords: "All reviewed!", noneLeftEmoji: "🎉" }
    answer = () => Response.json(celebrated)
    expect(await fetchRingCountsFromRoute(ROUTE)).toEqual(celebrated)
  })

  test("are absent from the reading when the body carries neither", async () => {
    expect(await fetchRingCountsFromRoute(ROUTE)).toEqual(COUNTS)
  })
})
