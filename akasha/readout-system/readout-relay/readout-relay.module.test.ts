import { beforeEach, expect, test } from "bun:test"
import { RELAY_SECRET_HEADER } from "../readout-credential/readout-credential.module.code.ts"
import {
  dropRelayed,
  holdRelayed,
  RELAY_PATH,
  readoutNamedBy,
  relayedHeld,
  relayedIn,
  relayReading,
  type Sent,
  statedIn,
} from "./readout-relay.module.code.ts"

const READOUT = "monarch-unreviewed-transactions"

const PAGE = `akasha/readout-system/readout/readouts/${READOUT}/${READOUT}.readout.ts`

const TAKEN = "2026-08-31T12:00:00.000Z"

const SECRET = "a-relay-secret-standing-only-in-this-test"

beforeEach(() => dropRelayed())

test("a machine that starts again holds no reading", () => {
  expect(relayedHeld(READOUT)).toBeNull()
})

test("a reading arriving is held under the name of the readout it was taken for", () => {
  holdRelayed({ readout: READOUT, value: 19, at: TAKEN })
  expect(relayedHeld(READOUT)).toEqual({ value: 19, at: TAKEN })
  expect(relayedHeld("some-other-readout")).toBeNull()
})

test("a reading arriving replaces the one held before it", () => {
  holdRelayed({ readout: READOUT, value: 19, at: TAKEN })
  holdRelayed({ readout: READOUT, value: 4, at: "2026-08-31T12:05:00.000Z" })
  expect(relayedHeld(READOUT)).toEqual({ value: 4, at: "2026-08-31T12:05:00.000Z" })
})

test("a reading of nothing is a reading rather than an absent one", () => {
  holdRelayed({ readout: READOUT, value: 0, at: TAKEN })
  expect(relayedHeld(READOUT)?.value).toBe(0)
})

test("a whole reading is taken off the wire", () => {
  expect(relayedIn({ readout: READOUT, value: 19, at: TAKEN })).toEqual({
    readout: READOUT,
    value: 19,
    at: TAKEN,
  })
})

test("a body that is not a whole reading is refused rather than held", () => {
  expect(relayedIn({ readout: READOUT, value: 19 })).toBeNull()
  expect(relayedIn({ readout: READOUT, at: TAKEN })).toBeNull()
  expect(relayedIn({ value: 19, at: TAKEN })).toBeNull()
  expect(relayedIn({ readout: READOUT, value: -1, at: TAKEN })).toBeNull()
  expect(relayedIn({ readout: "", value: 19, at: TAKEN })).toBeNull()
  expect(relayedIn("19")).toBeNull()
  expect(relayedIn(null)).toBeNull()
})

test("a moment that cannot be read is no reading", () => {
  expect(relayedIn({ readout: READOUT, value: 19, at: "never" })).toBeNull()
})

test("the readout carried under is read off the name of the page it was named by", () => {
  expect(readoutNamedBy(PAGE)).toBe(READOUT)
})

test("a path naming no readout refuses rather than carrying under an empty name", () => {
  expect(() => readoutNamedBy("")).toThrow()
})

test("a carrier presents the relay secret and the moment the reading was taken", async () => {
  const sent: { to: string; secret: string | null; body: unknown }[] = []
  const send: Sent = async (to, init) => {
    sent.push({
      to: to.href,
      secret: new Headers(init.headers).get(RELAY_SECRET_HEADER),
      body: JSON.parse(String(init.body)),
    })
    return new Response(null, { status: 204 })
  }
  await relayReading(
    "https://alanwalton.com",
    SECRET,
    { readout: READOUT, value: 19, at: TAKEN },
    send
  )
  expect(sent).toEqual([
    {
      to: `https://alanwalton.com${RELAY_PATH}`,
      secret: SECRET,
      body: { readout: READOUT, value: 19, at: TAKEN },
    },
  ])
})

test("what a carrier sends is what a receiver takes off the wire", async () => {
  const send: Sent = async (_to, init) => {
    const taken = relayedIn(JSON.parse(String(init.body)))
    if (taken === null) return new Response(null, { status: 400 })
    holdRelayed(taken)
    return new Response(null, { status: 204 })
  }
  await relayReading(
    "https://alanwalton.com",
    SECRET,
    { readout: READOUT, value: 19, at: TAKEN },
    send
  )
  expect(relayedHeld(READOUT)).toEqual({ value: 19, at: TAKEN })
})

test("an answer that is not OK is refused rather than counted as carried", async () => {
  const send: Sent = async () => new Response(null, { status: 401 })
  await expect(
    relayReading("https://alanwalton.com", SECRET, { readout: READOUT, value: 19, at: TAKEN }, send)
  ).rejects.toThrow("401")
})

test("a value that is unset or empty is stated as none", () => {
  expect(statedIn({ READING_RELAY_TO: "https://alanwalton.com" }, "READING_RELAY_TO")).toBe(
    "https://alanwalton.com"
  )
  expect(statedIn({ READING_RELAY_TO: "  " }, "READING_RELAY_TO")).toBeNull()
  expect(statedIn({}, "READING_RELAY_TO")).toBeNull()
})
