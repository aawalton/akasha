import { afterAll, beforeEach, expect, test } from "bun:test"
import { realpathSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { RELAY_SECRET_HEADER } from "akasha/alan/harness/readouts/credential/readout-credential.module.code.ts"
import {
  dropRelayed,
  holdRelayed,
  JOURNAL_ERROR_LEVEL,
  noReadoutPageAt,
  RELAY_PATH,
  RELAY_SECRET_NAME,
  readoutNamedBy,
  readoutPageAt,
  relayedHeld,
  relayedIn,
  relayReading,
  type Sent,
  statedIn,
} from "akasha/alan/harness/readouts/relay/readout-relay.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"

const READOUT = "monarch-unreviewed-transactions"

const PAGE = `readouts/pages/${READOUT}/${READOUT}.readout.ts`

const TAKEN = "2026-08-31T12:00:00.000Z"

const SECRET = "a-relay-secret-existing-only-in-this-test"

const scratch = scratchWorld()

afterAll(scratch.sweep)

beforeEach(() => dropRelayed())

test("a machine that starts again holds no reading", () => {
  expect(relayedHeld(READOUT)).toBeNull()
})

const carried = (value: number, at: string = TAKEN, fallsPerHour = 0) => ({
  readout: READOUT,
  value,
  at,
  fallsPerHour,
})

test("a reading arriving is held under the name of the readout it was taken for", () => {
  holdRelayed(carried(19))
  expect(relayedHeld(READOUT)).toEqual({ value: 19, at: TAKEN, fallsPerHour: 0 })
  expect(relayedHeld("some-other-readout")).toBeNull()
})

test("a reading arriving replaces the one held before it", () => {
  holdRelayed(carried(19))
  holdRelayed(carried(4, "2026-08-31T12:05:00.000Z"))
  expect(relayedHeld(READOUT)).toEqual({
    value: 4,
    at: "2026-08-31T12:05:00.000Z",
    fallsPerHour: 0,
  })
})

test("a reading of nothing is a reading rather than an absent one", () => {
  holdRelayed(carried(0))
  expect(relayedHeld(READOUT)?.value).toBe(0)
})

test("how fast a reading falls with the clock is held beside that reading", () => {
  holdRelayed(carried(19, TAKEN, 2))
  expect(relayedHeld(READOUT)?.fallsPerHour).toBe(2)
})

test("a whole reading is taken off the wire", () => {
  expect(relayedIn({ readout: READOUT, value: 19, at: TAKEN })).toEqual(carried(19))
})

test("a body naming a rate carries that rate rather than dropping it", () => {
  expect(relayedIn({ readout: READOUT, value: 19, at: TAKEN, fallsPerHour: 2 })).toEqual(
    carried(19, TAKEN, 2)
  )
})

test("a body naming no rate is carried as a reading falling at nothing an hour", () => {
  expect(relayedIn({ readout: READOUT, value: 19, at: TAKEN })?.fallsPerHour).toBe(0)
})

test("a rate that is no finite number is refused rather than carried", () => {
  expect(relayedIn({ readout: READOUT, value: 19, at: TAKEN, fallsPerHour: "2" })).toBeNull()
  expect(relayedIn({ readout: READOUT, value: 19, at: TAKEN, fallsPerHour: Number.NaN })).toBeNull()
})

test("a body that is not a whole reading is refused rather than held", () => {
  expect(relayedIn({ readout: READOUT, value: 19 })).toBeNull()
  expect(relayedIn({ readout: READOUT, at: TAKEN })).toBeNull()
  expect(relayedIn({ value: 19, at: TAKEN })).toBeNull()
  expect(relayedIn({ readout: READOUT, value: Number.NaN, at: TAKEN })).toBeNull()
  expect(relayedIn({ readout: READOUT, value: Number.POSITIVE_INFINITY, at: TAKEN })).toBeNull()
  expect(relayedIn({ readout: READOUT, value: "19", at: TAKEN })).toBeNull()
  expect(relayedIn({ readout: "", value: 19, at: TAKEN })).toBeNull()
  expect(relayedIn("19")).toBeNull()
  expect(relayedIn(null)).toBeNull()
})

test("a reading below zero is carried rather than refused", () => {
  expect(relayedIn({ readout: READOUT, value: -2, at: TAKEN })).toEqual(carried(-2))
})

test("a reading between two whole numbers is carried rather than refused", () => {
  expect(relayedIn({ readout: READOUT, value: -1.5, at: TAKEN })).toEqual(carried(-1.5))
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
  await relayReading("https://alanwalton.com", SECRET, carried(19, TAKEN, 2), send)
  expect(sent).toEqual([
    {
      to: `https://alanwalton.com${RELAY_PATH}`,
      secret: SECRET,
      body: { readout: READOUT, value: 19, at: TAKEN, fallsPerHour: 2 },
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
  await relayReading("https://alanwalton.com", SECRET, carried(19, TAKEN, 2), send)
  expect(relayedHeld(READOUT)).toEqual({ value: 19, at: TAKEN, fallsPerHour: 2 })
})

test("an answer that is not OK is refused rather than counted as carried", async () => {
  const send: Sent = async () => new Response(null, { status: 401 })
  await expect(relayReading("https://alanwalton.com", SECRET, carried(19), send)).rejects.toThrow(
    "401"
  )
})

test("a secret that is unset or empty is stated as none", () => {
  expect(statedIn({ [RELAY_SECRET_NAME]: SECRET }, RELAY_SECRET_NAME)).toBe(SECRET)
  expect(statedIn({ [RELAY_SECRET_NAME]: "  " }, RELAY_SECRET_NAME)).toBeNull()
  expect(statedIn({}, RELAY_SECRET_NAME)).toBeNull()
})

test("a readout page that is there is told apart from one that is not", () => {
  const root = realpathSync(scratch.rootFor("readout-relay-"))
  const own = `${READOUT}.readout.ts`
  writeFileSync(join(root, own), "")
  expect(readoutPageAt(root, own)).toBe(join(root, own))
  expect(readoutPageAt(root, `${READOUT}.readout.no-such.ts`)).toBeNull()
})

test("a path naming no readout page is refused in words of its own", () => {
  const said = noReadoutPageAt(PAGE)
  expect(said).toContain("no readout page is at")
  expect(said).toContain(PAGE)
})

test("a path naming no readout page is said at the level a journal keeps for an error", () => {
  expect(noReadoutPageAt(PAGE).startsWith(JOURNAL_ERROR_LEVEL)).toBe(true)
})
