import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import {
  aheadOf,
  clockOf,
  fiveHourSpent,
  inOrder,
  instantOf,
  linesOf,
  marksOf,
  type Reading,
  readingsIn,
  sevenDaySpent,
  takenOf,
} from "./claude-account-measuring.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const NOW = Date.parse("2026-08-31T12:00:00.000Z")

function reading(said: Partial<Reading> & { account: string }): Reading {
  return {
    aliasIndex: null,
    fiveHourPercentUsed: null,
    sevenDayPercentUsed: null,
    fiveHourResetsAt: null,
    sevenDayResetsAt: null,
    accessTokenExpiresAt: null,
    usageReadAt: "2026-08-31T11:00:00.000Z",
    terminalAt: null,
    subscriptionDisabledReason: null,
    ...said,
  }
}

test("an account whose subscription is withdrawn has spent all of both windows", () => {
  const one = reading({
    account: "a",
    fiveHourPercentUsed: 0,
    sevenDayPercentUsed: 0,
    subscriptionDisabledReason: "the card was declined",
  })

  expect(fiveHourSpent(one)).toBe(100)
  expect(sevenDaySpent(one)).toBe(100)
})

test("an account that has spent its seven-day window has spent its five-hour one", () => {
  const one = reading({ account: "a", fiveHourPercentUsed: 0, sevenDayPercentUsed: 100 })

  expect(fiveHourSpent(one)).toBe(100)
  expect(sevenDaySpent(one)).toBe(100)
})

test("a window nothing has been read of is spent by no amount rather than by none", () => {
  expect(fiveHourSpent(reading({ account: "a" }))).toBeNull()
  expect(sevenDaySpent(reading({ account: "a" }))).toBeNull()
})

test("the account taken is the one whose seven-day window resets soonest", () => {
  const soon = reading({
    account: "soon",
    fiveHourPercentUsed: 40,
    sevenDayPercentUsed: 40,
    sevenDayResetsAt: "2026-09-01T12:00:00.000Z",
  })
  const later = reading({
    account: "later",
    fiveHourPercentUsed: 0,
    sevenDayPercentUsed: 0,
    sevenDayResetsAt: "2026-09-05T12:00:00.000Z",
  })

  expect(takenOf([later, soon], NOW)).toBe("soon")
})

test("an account that has spent a whole window is not taken", () => {
  const spent = reading({
    account: "spent",
    fiveHourPercentUsed: 0,
    sevenDayPercentUsed: 100,
    sevenDayResetsAt: "2026-09-01T12:00:00.000Z",
  })
  const open = reading({
    account: "open",
    fiveHourPercentUsed: 0,
    sevenDayPercentUsed: 0,
    sevenDayResetsAt: "2026-09-05T12:00:00.000Z",
  })

  expect(takenOf([spent, open], NOW)).toBe("open")
})

test("an account whose access token has lapsed is passed over", () => {
  const lapsed = reading({
    account: "lapsed",
    fiveHourPercentUsed: 0,
    sevenDayPercentUsed: 0,
    sevenDayResetsAt: "2026-09-01T12:00:00.000Z",
    accessTokenExpiresAt: "2026-08-31T11:00:00.000Z",
  })
  const live = reading({
    account: "live",
    fiveHourPercentUsed: 0,
    sevenDayPercentUsed: 0,
    sevenDayResetsAt: "2026-09-05T12:00:00.000Z",
    accessTokenExpiresAt: "2026-09-01T00:00:00.000Z",
  })

  expect(takenOf([lapsed, live], NOW)).toBe("live")
})

test("a fleet with every window spent takes no account", () => {
  const one = reading({ account: "a", fiveHourPercentUsed: 100, sevenDayPercentUsed: 100 })

  expect(takenOf([one], NOW)).toBeNull()
})

test("a seven-day window already past counts as the furthest away", () => {
  const past = reading({ account: "past", sevenDayResetsAt: "2026-08-30T12:00:00.000Z" })
  const ahead = reading({ account: "ahead", sevenDayResetsAt: "2026-09-01T12:00:00.000Z" })

  expect(aheadOf(ahead, past, NOW)).toBeLessThan(0)
})

test("accounts stand in the order their seven-day windows reset", () => {
  const one = reading({ account: "one", sevenDayResetsAt: "2026-09-05T12:00:00.000Z" })
  const two = reading({ account: "two", sevenDayResetsAt: "2026-09-01T12:00:00.000Z" })
  const none = reading({ account: "none" })

  expect(inOrder([one, none, two]).map((held) => held.account)).toEqual(["two", "one", "none"])
})

test("an account that can no longer renew itself is marked with the alias that signs it back in", () => {
  const one = reading({ account: "a", aliasIndex: 3, terminalAt: "2026-08-31T09:00:00.000Z" })

  expect(marksOf(one)).toEqual(["c3"])
})

test("an account carrying no alias is marked terminal rather than with an alias it has not got", () => {
  const one = reading({ account: "a", terminalAt: "2026-08-31T09:00:00.000Z" })

  expect(marksOf(one)).toEqual(["terminal"])
})

test("an account no window has been read of is marked unread", () => {
  expect(marksOf(reading({ account: "a", usageReadAt: null }))).toEqual(["unread"])
})

test("an account standing well carries no mark", () => {
  expect(marksOf(reading({ account: "a" }))).toEqual([])
})

test("a marked account carries its marks in one order", () => {
  const one = reading({
    account: "a",
    aliasIndex: 2,
    terminalAt: "2026-08-31T09:00:00.000Z",
    usageReadAt: null,
    subscriptionDisabledReason: "the card was declined",
  })

  expect(marksOf(one)).toEqual(["disabled", "c2", "unread"])
})

test("an instant nothing states is no clock, and one that is no instant is no clock either", () => {
  expect(clockOf(null)).toBe("")
  expect(clockOf("the day after")).toBe("")
  expect(instantOf("the day after")).toBeNull()
})

test("one line stands for each account, and the taken one is the marked one", () => {
  const soon = reading({
    account: "soon",
    fiveHourPercentUsed: 5,
    sevenDayPercentUsed: 40,
    sevenDayResetsAt: "2026-09-01T12:00:00.000Z",
  })
  const later = reading({
    account: "later",
    fiveHourPercentUsed: 0,
    sevenDayPercentUsed: 0,
    sevenDayResetsAt: "2026-09-05T12:00:00.000Z",
  })
  const said = linesOf([later, soon], NOW)

  expect(said.length).toBe(2)
  expect(said[0]?.startsWith("> soon ")).toBe(true)
  expect(said[0]).toContain("  5%")
  expect(said[0]).toContain(" 40%")
  expect(said[1]?.startsWith("  later")).toBe(true)
})

test("a window nothing has been read of is said as unknown rather than as nothing spent", () => {
  const said = linesOf([reading({ account: "a" })], NOW)

  expect(said[0]).toContain("?%")
})

test("a root naming no claude-account index is refused rather than read as a fleet of none", () => {
  const root = scratch.rootFor("akasha-measuring-")

  expect(() => readingsIn(root)).toThrow()
})
