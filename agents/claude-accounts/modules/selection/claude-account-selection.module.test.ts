import { expect, test } from "bun:test"
import type { AccountState } from "../../../models/gateway/modules/oauth-types/oauth-types.module.code.ts"
import {
  explainAccountEligibility,
  formatPoolEligibilityBreakdown,
  parseFutureIsoMs,
  selectBestAccount,
  summarizePool,
} from "./claude-account-selection.module.code.ts"

const NOW = Date.parse("2026-09-02T12:00:00.000Z")

const AN_HOUR = 3_600_000

const FALLBACK_HOURS = 144

function hoursUntilReset(args: { now: number; sevenDayResetsAt: string | null }): number {
  if (args.sevenDayResetsAt === null) return FALLBACK_HOURS
  const at = Date.parse(args.sevenDayResetsAt)
  if (Number.isNaN(at)) return FALLBACK_HOURS
  const left = at - args.now
  return left <= 0 ? FALLBACK_HOURS : left / AN_HOUR
}

function isoFromNow(hours: number): string {
  return new Date(NOW + hours * AN_HOUR).toISOString()
}

function stateOf(account: string, over: Partial<AccountState> = {}): AccountState {
  return {
    account,
    fiveHourUtil: 0,
    sevenDayUtil: 0,
    sevenDayResetsAt: null,
    fiveHourResetsAt: null,
    subscriptionType: null,
    subscriptionDisabled: false,
    fiveHourAtLimitUntil: null,
    renewalTerminal: false,
    accessTokenExpiresAt: null,
    ...over,
  }
}

function mapOf(states: readonly AccountState[]): ReadonlyMap<string, AccountState> {
  return new Map(states.map((one) => [one.account, one]))
}

function pickedOf(
  states: readonly AccountState[],
  candidateSlugs?: readonly string[],
  excludes?: ReadonlySet<string>
): string | null {
  const slugs = candidateSlugs ?? states.map((one) => one.account)
  const found = selectBestAccount({
    candidates: slugs.map((account) => ({ account })),
    states: mapOf(states),
    now: NOW,
    hoursUntilReset,
    excludes,
  })
  return found === null ? null : found.candidate.account
}

test("the soonest seven-day reset wins over a lighter account", () => {
  const heavySoon = stateOf("heavy-soon", { sevenDayUtil: 90, sevenDayResetsAt: isoFromNow(10) })
  const lightLate = stateOf("light-late", { sevenDayUtil: 10, sevenDayResetsAt: isoFromNow(50) })
  expect(pickedOf([heavySoon, lightLate])).toBe("heavy-soon")
})

test("a tie on the reset hour falls to the lower seven-day share", () => {
  const at = isoFromNow(20)
  const spent = stateOf("bravo", { sevenDayUtil: 40, sevenDayResetsAt: at })
  const spare = stateOf("charlie", { sevenDayUtil: 15, sevenDayResetsAt: at })
  expect(pickedOf([spent, spare])).toBe("charlie")
})

test("a tie on the seven-day share falls to the lower five-hour share", () => {
  const at = isoFromNow(20)
  const spent = stateOf("bravo", { sevenDayUtil: 40, fiveHourUtil: 70, sevenDayResetsAt: at })
  const spare = stateOf("charlie", { sevenDayUtil: 40, fiveHourUtil: 20, sevenDayResetsAt: at })
  expect(pickedOf([spent, spare])).toBe("charlie")
})

test("a tie on both shares falls to the account slug ascending", () => {
  const at = isoFromNow(20)
  const zeta = stateOf("zeta", { sevenDayUtil: 40, fiveHourUtil: 20, sevenDayResetsAt: at })
  const alpha = stateOf("alpha", { sevenDayUtil: 40, fiveHourUtil: 20, sevenDayResetsAt: at })
  expect(pickedOf([zeta, alpha])).toBe("alpha")
  expect(pickedOf([alpha, zeta])).toBe("alpha")
})

test("an excluded account is dropped even where that account would win", () => {
  const soon = stateOf("soon", { sevenDayResetsAt: isoFromNow(4) })
  const late = stateOf("late", { sevenDayResetsAt: isoFromNow(40) })
  expect(pickedOf([soon, late])).toBe("soon")
  expect(pickedOf([soon, late], undefined, new Set(["soon"]))).toBe("late")
})

test("an exclude set naming the whole fleet is answered as no pick", () => {
  const soon = stateOf("soon", { sevenDayResetsAt: isoFromNow(4) })
  const late = stateOf("late", { sevenDayResetsAt: isoFromNow(40) })
  expect(pickedOf([soon, late], undefined, new Set(["soon", "late"]))).toBeNull()
})

test("a fleet with every account maxed is answered as no pick", () => {
  const fiveMaxed = stateOf("five", { fiveHourUtil: 100, sevenDayResetsAt: isoFromNow(4) })
  const sevenMaxed = stateOf("seven", { sevenDayUtil: 100, sevenDayResetsAt: isoFromNow(6) })
  expect(pickedOf([fiveMaxed, sevenMaxed])).toBeNull()
})

test("a fleet of one eligible account picks that account", () => {
  expect(pickedOf([stateOf("only", { sevenDayUtil: 99.9, fiveHourUtil: 99.9 })])).toBe("only")
})

test("a share of exactly 100 is maxed and 99.9 is not", () => {
  expect(pickedOf([stateOf("edge", { sevenDayUtil: 99.9 })])).toBe("edge")
  expect(pickedOf([stateOf("edge", { sevenDayUtil: 100 })])).toBeNull()
  expect(pickedOf([stateOf("edge", { fiveHourUtil: 100 })])).toBeNull()
})

test("an account no measurement covers reads as nothing spent", () => {
  const found = selectBestAccount({
    candidates: [{ account: "fresh", subscriptionType: "max" }],
    states: new Map(),
    now: NOW,
    hoursUntilReset,
  })
  expect(found?.state.fiveHourUtil).toBe(0)
  expect(found?.state.sevenDayUtil).toBe(0)
  expect(found?.state.sevenDayResetsAt).toBeNull()
  expect(found?.state.subscriptionType).toBe("max")
})

test("an unmeasured account is picked behind an account whose window is nearly up", () => {
  const nearlyUp = stateOf("nearly-up", { sevenDayUtil: 95, sevenDayResetsAt: isoFromNow(10) })
  expect(pickedOf([nearlyUp], ["nearly-up", "unmeasured"])).toBe("nearly-up")
})

test("an unmeasured account is picked ahead of an account whose window just reset", () => {
  const fresh = stateOf("fresh", { sevenDayUtil: 0, sevenDayResetsAt: isoFromNow(168) })
  expect(pickedOf([fresh], ["fresh", "unmeasured"])).toBe("unmeasured")
})

test("the hours an unknown reset answers sit between 143 and 145 hours out", () => {
  const nearer = stateOf("measured", { sevenDayResetsAt: isoFromNow(143) })
  expect(pickedOf([nearer], ["measured", "unmeasured"])).toBe("measured")
  const further = stateOf("measured", { sevenDayResetsAt: isoFromNow(145) })
  expect(pickedOf([further], ["measured", "unmeasured"])).toBe("unmeasured")
})

test("a maxed account leaves an unmeasured account as the only eligible one", () => {
  const maxed = stateOf("maxed", { sevenDayUtil: 100, sevenDayResetsAt: isoFromNow(10) })
  expect(pickedOf([maxed], ["maxed", "unmeasured"])).toBe("unmeasured")
})

test("a seven-day reset already past is ranked as an unknown reset is", () => {
  const stale = stateOf("stale", { sevenDayResetsAt: isoFromNow(-3) })
  const nearlyUp = stateOf("nearly-up", { sevenDayResetsAt: isoFromNow(143) })
  expect(pickedOf([stale, nearlyUp])).toBe("nearly-up")
  const fresh = stateOf("fresh", { sevenDayResetsAt: isoFromNow(168) })
  expect(pickedOf([stale, fresh])).toBe("stale")
})

test("a stale account and an unmeasured one are told apart only by the slug", () => {
  const zeta = stateOf("zeta-stale", { sevenDayResetsAt: isoFromNow(-3) })
  expect(pickedOf([zeta], ["zeta-stale", "alpha-unmeasured"])).toBe("alpha-unmeasured")
  const alpha = stateOf("alpha-stale", { sevenDayResetsAt: isoFromNow(-3) })
  expect(pickedOf([alpha], ["alpha-stale", "zeta-unmeasured"])).toBe("alpha-stale")
})

test("a seven-day reset that will not parse is ranked as an unknown reset is", () => {
  const junk = stateOf("junk", { sevenDayResetsAt: "not an instant" })
  const fresh = stateOf("fresh", { sevenDayResetsAt: isoFromNow(168) })
  expect(pickedOf([junk, fresh])).toBe("junk")
})

test("an account whose subscription is withdrawn is still picked", () => {
  const off = stateOf("off", { subscriptionDisabled: true, sevenDayResetsAt: isoFromNow(4) })
  const on = stateOf("on", { sevenDayResetsAt: isoFromNow(40) })
  expect(pickedOf([off, on])).toBe("off")
})

test("an account that can no longer renew itself is still picked", () => {
  const done = stateOf("done", { renewalTerminal: true, sevenDayResetsAt: isoFromNow(4) })
  const live = stateOf("live", { sevenDayResetsAt: isoFromNow(40) })
  expect(pickedOf([done, live])).toBe("done")
})

test("an account held at its five-hour limit is still picked", () => {
  const held = stateOf("held", {
    fiveHourAtLimitUntil: NOW + AN_HOUR,
    sevenDayResetsAt: isoFromNow(4),
  })
  const free = stateOf("free", { sevenDayResetsAt: isoFromNow(40) })
  expect(pickedOf([held, free])).toBe("held")
})

test("an account whose access token has lapsed is still picked", () => {
  const stale = stateOf("stale", {
    accessTokenExpiresAt: NOW - AN_HOUR,
    sevenDayResetsAt: isoFromNow(4),
  })
  const fresh = stateOf("fresh", { sevenDayResetsAt: isoFromNow(40) })
  expect(pickedOf([stale, fresh])).toBe("stale")
})

test("a pick answers with the candidate object the caller handed in", () => {
  const candidate = { account: "kept", subscriptionType: "max", token: "secret" }
  const found = selectBestAccount({
    candidates: [candidate],
    states: mapOf([stateOf("kept", { sevenDayResetsAt: isoFromNow(4) })]),
    now: NOW,
    hoursUntilReset,
  })
  expect(found?.candidate).toBe(candidate)
  expect(found?.state.account).toBe("kept")
})

test("an eligibility explanation names each maxed window", () => {
  expect(explainAccountEligibility(stateOf("a"))).toEqual({ eligible: true, reasons: [] })
  expect(explainAccountEligibility(stateOf("a", { fiveHourUtil: 100 }))).toEqual({
    eligible: false,
    reasons: ["five-hour-maxed"],
  })
  expect(
    explainAccountEligibility(stateOf("a", { fiveHourUtil: 100, sevenDayUtil: 100 })).reasons
  ).toEqual(["five-hour-maxed", "seven-day-maxed"])
})

test("an eligibility breakdown names each account beside its reasons", () => {
  const free = stateOf("free")
  const maxed = stateOf("maxed", { fiveHourUtil: 100, sevenDayUtil: 100 })
  expect(formatPoolEligibilityBreakdown([free, maxed])).toBe(
    "free=eligible maxed=five-hour-maxed,seven-day-maxed"
  )
})

test("a pool summary counts the eligible and names the earliest return", () => {
  const free = stateOf("free")
  const soon = stateOf("soon", { sevenDayUtil: 100, sevenDayResetsAt: isoFromNow(3) })
  const late = stateOf("late", { sevenDayUtil: 100, sevenDayResetsAt: isoFromNow(9) })
  expect(summarizePool([free, soon, late])).toEqual({
    eligibleCount: 1,
    totalCount: 3,
    earliestEligibleResetMs: NOW + 3 * AN_HOUR,
  })
})

test("an account maxed on both windows returns at the later reset", () => {
  const both = stateOf("both", {
    fiveHourUtil: 100,
    sevenDayUtil: 100,
    fiveHourResetsAt: isoFromNow(2),
    sevenDayResetsAt: isoFromNow(30),
  })
  expect(summarizePool([both]).earliestEligibleResetMs).toBe(NOW + 30 * AN_HOUR)
})

test("a blocking window naming no reset leaves the return unknown", () => {
  const blind = stateOf("blind", { sevenDayUtil: 100, sevenDayResetsAt: null })
  expect(summarizePool([blind])).toEqual({
    eligibleCount: 0,
    totalCount: 1,
    earliestEligibleResetMs: null,
  })
})

test("a future instant parses and a past one does not", () => {
  expect(parseFutureIsoMs(isoFromNow(1), NOW)).toBe(NOW + AN_HOUR)
  expect(parseFutureIsoMs(isoFromNow(-1), NOW)).toBeNull()
  expect(parseFutureIsoMs(isoFromNow(0), NOW)).toBeNull()
  expect(parseFutureIsoMs(null, NOW)).toBeNull()
  expect(parseFutureIsoMs("not an instant", NOW)).toBeNull()
})
