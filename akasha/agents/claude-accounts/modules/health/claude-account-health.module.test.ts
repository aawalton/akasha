import { describe, expect, test } from "bun:test"
import type { RefreshOutcome } from "../oauth/claude-account-oauth.module.code.ts"
import type { AccountState } from "../reading/claude-account-reading.module.code.ts"
import {
  AT_LIMIT_HEAL_THRESHOLD_MS,
  decideTokenTerminalAlert,
  healthOf,
  refreshHealthMarks,
  staleAtLimitIn,
  type TokenTerminalGiven,
  terminalAlertMarks,
  terminalHealthMarks,
  windowTriggerMarks,
} from "./claude-account-health.module.code.ts"

const NOW = 1_700_000_000_000

const NOW_AT = "2023-11-14T22:13:20.000Z"

const NO_MOMENT = [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 1e16]

const WORKED: RefreshOutcome = {
  ok: true,
  credential: {
    account: "one",
    accessToken: "an-access-token",
    refreshToken: "a-refresh-token",
    expiresAt: NOW,
    scopes: [],
    subscriptionType: null,
    rateLimitTier: null,
  },
}

const TERMINAL: RefreshOutcome = {
  ok: false,
  terminal: true,
  reason: "http-error",
  status: 400,
  code: "invalid_grant",
  description: null,
}

const RETRYABLE: RefreshOutcome = {
  ok: false,
  terminal: false,
  reason: "http-error",
  status: 500,
  code: null,
  description: null,
}

const NO_CREDENTIAL: RefreshOutcome = { ok: false, terminal: false, reason: "no-credential" }

const THREW: RefreshOutcome = { ok: false, terminal: true, reason: "exception", error: "boom" }

function stateAt(slug: string, retryAllowedAtMs: number | null): AccountState {
  return {
    slug,
    fiveHourPercentUsed: 0,
    sevenDayPercentUsed: 0,
    fiveHourResetsAt: null,
    sevenDayResetsAt: null,
    subscriptionType: null,
    subscriptionDisabledReason: null,
    retryAllowedAtMs,
    terminalAtMs: null,
    terminalAlertedAtMs: null,
    lastWindowTriggerAtMs: null,
    accessTokenExpiresAtMs: null,
  }
}

function given(over: Partial<TokenTerminalGiven>): TokenTerminalGiven {
  return {
    refreshTerminal: false,
    refreshOk: false,
    accessTokenExpiresAtMs: null,
    alreadyAlertedAtMs: null,
    nowMs: NOW,
    ...over,
  }
}

describe("healthOf", () => {
  test("a refresh that worked reads as ok", () => {
    expect(healthOf(WORKED)).toBe("ok")
  })

  test("a refresh that failed reads as terminal where the failure says it is terminal", () => {
    expect(healthOf(TERMINAL)).toBe("terminal")
    expect(healthOf(THREW)).toBe("terminal")
  })

  test("a refresh that failed reads as retryable where the failure says it is not", () => {
    expect(healthOf(RETRYABLE)).toBe("retryable")
    expect(healthOf(NO_CREDENTIAL)).toBe("retryable")
  })

  test("nothing here reads the reason a failure names", () => {
    for (const reason of ["no-credential", "http-error", "exception"] as const) {
      expect(healthOf({ ok: false, terminal: true, reason })).toBe("terminal")
      expect(healthOf({ ok: false, terminal: false, reason })).toBe("retryable")
    }
  })
})

describe("refreshHealthMarks", () => {
  test("a refresh that is terminal marks the moment handed in as the terminal instant", () => {
    expect(refreshHealthMarks(TERMINAL, NOW)).toEqual({ terminalAt: NOW_AT })
    expect(refreshHealthMarks(THREW, NOW)).toEqual({ terminalAt: NOW_AT })
  })

  test("a refresh that is not terminal removes the terminal instant", () => {
    expect(refreshHealthMarks(WORKED, NOW)).toEqual({ terminalAt: null })
    expect(refreshHealthMarks(RETRYABLE, NOW)).toEqual({ terminalAt: null })
    expect(refreshHealthMarks(NO_CREDENTIAL, NOW)).toEqual({ terminalAt: null })
  })

  test("a refresh that is not terminal removes the terminal instant whatever moment arrives", () => {
    for (const moment of NO_MOMENT) {
      expect(refreshHealthMarks(WORKED, moment)).toEqual({ terminalAt: null })
    }
  })

  test("a terminal refresh handed a moment no instant reads from marks nothing", () => {
    for (const moment of NO_MOMENT) {
      expect(refreshHealthMarks(TERMINAL, moment)).toEqual({})
    }
  })

  test("a mark built here is keyed `terminalAt` and nothing else", () => {
    expect(Object.keys(refreshHealthMarks(TERMINAL, NOW))).toEqual(["terminalAt"])
    expect(Object.keys(refreshHealthMarks(WORKED, NOW))).toEqual(["terminalAt"])
  })
})

describe("terminalHealthMarks", () => {
  test("a terminal health marks the moment handed in", () => {
    expect(terminalHealthMarks(NOW)).toEqual({ terminalAt: NOW_AT })
  })

  test("a moment no instant reads from marks nothing rather than a removal", () => {
    for (const moment of NO_MOMENT) {
      expect(terminalHealthMarks(moment)).toEqual({})
    }
  })

  test("the epoch is a moment like any other", () => {
    expect(terminalHealthMarks(0)).toEqual({ terminalAt: "1970-01-01T00:00:00.000Z" })
  })
})

describe("windowTriggerMarks", () => {
  test("a window trigger marks the moment handed in", () => {
    expect(windowTriggerMarks(NOW)).toEqual({ lastWindowTriggerAt: NOW_AT })
  })

  test("a moment no instant reads from marks nothing rather than a removal", () => {
    for (const moment of NO_MOMENT) {
      expect(windowTriggerMarks(moment)).toEqual({})
    }
  })

  test("a window trigger touches no terminal instant", () => {
    expect(Object.keys(windowTriggerMarks(NOW))).toEqual(["lastWindowTriggerAt"])
  })
})

describe("terminalAlertMarks", () => {
  test("an alert latch carries the instant handed in rather than one read here", () => {
    expect(terminalAlertMarks(NOW_AT)).toEqual({ terminalAlertedAt: NOW_AT })
    expect(terminalAlertMarks("2020-01-01T00:00:00.000Z")).toEqual({
      terminalAlertedAt: "2020-01-01T00:00:00.000Z",
    })
  })

  test("a latch handed no instant is a removal", () => {
    expect(terminalAlertMarks(null)).toEqual({ terminalAlertedAt: null })
  })

  test("a latch handed blank text is a removal", () => {
    expect(terminalAlertMarks("")).toEqual({ terminalAlertedAt: null })
    expect(terminalAlertMarks("   ")).toEqual({ terminalAlertedAt: null })
    expect(terminalAlertMarks("\t")).toEqual({ terminalAlertedAt: null })
  })

  test("nothing here reads whether the text handed in is an instant", () => {
    expect(terminalAlertMarks("nope")).toEqual({ terminalAlertedAt: "nope" })
  })
})

describe("decideTokenTerminalAlert", () => {
  test("a token that is terminal and unalerted alerts", () => {
    const said = decideTokenTerminalAlert(
      given({ refreshTerminal: true, accessTokenExpiresAtMs: NOW - 1 })
    )
    expect(said).toBe("alert")
  })

  test("a token expiring exactly now is terminal", () => {
    const said = decideTokenTerminalAlert(
      given({ refreshTerminal: true, accessTokenExpiresAtMs: NOW })
    )
    expect(said).toBe("alert")
  })

  test("a token still unexpired is not terminal", () => {
    const said = decideTokenTerminalAlert(
      given({ refreshTerminal: true, accessTokenExpiresAtMs: NOW + 1 })
    )
    expect(said).toBe("none")
  })

  test("a token whose access token names no expiry is never terminal", () => {
    const said = decideTokenTerminalAlert(
      given({ refreshTerminal: true, accessTokenExpiresAtMs: null })
    )
    expect(said).toBe("none")
  })

  test("a refresh that is not terminal leaves an expired token alone", () => {
    const said = decideTokenTerminalAlert(
      given({ refreshTerminal: false, accessTokenExpiresAtMs: NOW - 1 })
    )
    expect(said).toBe("none")
  })

  test("a token that is terminal and already alerted alerts no second time", () => {
    const said = decideTokenTerminalAlert(
      given({
        refreshTerminal: true,
        accessTokenExpiresAtMs: NOW - 1,
        alreadyAlertedAtMs: NOW - 1000,
      })
    )
    expect(said).toBe("none")
  })

  test("a latch stamped at the epoch still counts as a latch", () => {
    const said = decideTokenTerminalAlert(
      given({ refreshTerminal: true, accessTokenExpiresAtMs: NOW - 1, alreadyAlertedAtMs: 0 })
    )
    expect(said).toBe("none")
  })

  test("a refresh that worked clears a latch that stands", () => {
    const said = decideTokenTerminalAlert(
      given({ refreshOk: true, alreadyAlertedAtMs: NOW - 1000 })
    )
    expect(said).toBe("clear-latch")
  })

  test("a refresh that worked with no latch standing decides nothing", () => {
    expect(decideTokenTerminalAlert(given({ refreshOk: true }))).toBe("none")
  })

  test("a latch standing under a refresh that did not work is left standing", () => {
    const said = decideTokenTerminalAlert(
      given({ refreshOk: false, alreadyAlertedAtMs: NOW - 1000 })
    )
    expect(said).toBe("none")
  })

  test("a token that is terminal is decided before a latch is cleared", () => {
    const said = decideTokenTerminalAlert(
      given({
        refreshTerminal: true,
        refreshOk: true,
        accessTokenExpiresAtMs: NOW - 1,
        alreadyAlertedAtMs: NOW - 1000,
      })
    )
    expect(said).toBe("none")
  })

  test("a refresh saying nothing decides nothing", () => {
    expect(decideTokenTerminalAlert(given({}))).toBe("none")
  })
})

describe("staleAtLimitIn", () => {
  const cutoff = NOW + AT_LIMIT_HEAL_THRESHOLD_MS

  test("the threshold a stale at-limit mark is found at is five hours", () => {
    expect(AT_LIMIT_HEAL_THRESHOLD_MS).toBe(5 * 3_600_000)
  })

  test("an at-limit instant further out than the threshold is stale", () => {
    expect(staleAtLimitIn([stateAt("one", cutoff + 1)], NOW)).toEqual([{ slug: "one" }])
    expect(staleAtLimitIn([stateAt("one", cutoff + 86_400_000)], NOW)).toEqual([{ slug: "one" }])
  })

  test("an at-limit instant exactly the threshold out is not stale", () => {
    expect(staleAtLimitIn([stateAt("one", cutoff)], NOW)).toEqual([])
  })

  test("an at-limit instant inside the threshold is not stale", () => {
    expect(staleAtLimitIn([stateAt("one", cutoff - 1)], NOW)).toEqual([])
    expect(staleAtLimitIn([stateAt("one", NOW)], NOW)).toEqual([])
    expect(staleAtLimitIn([stateAt("one", NOW - 86_400_000)], NOW)).toEqual([])
  })

  test("an account naming no at-limit instant is never stale", () => {
    expect(staleAtLimitIn([stateAt("one", null)], NOW)).toEqual([])
  })

  test("a caller may hand in a threshold other than that cap", () => {
    const at = NOW + 1000
    expect(staleAtLimitIn([stateAt("one", at)], NOW, 999)).toEqual([{ slug: "one" }])
    expect(staleAtLimitIn([stateAt("one", at)], NOW, 1000)).toEqual([])
    expect(staleAtLimitIn([stateAt("one", at)], NOW, 0)).toEqual([{ slug: "one" }])
  })

  test("a stale at-limit mark names the account and nothing else", () => {
    const found = staleAtLimitIn([stateAt("one", cutoff + 1)], NOW)
    expect(found).toHaveLength(1)
    expect(Object.keys(found[0] ?? {})).toEqual(["slug"])
  })

  test("only the stale accounts are answered, in the order they arrived", () => {
    const states = [
      stateAt("three", cutoff + 1),
      stateAt("one", null),
      stateAt("two", cutoff),
      stateAt("four", cutoff + 2),
    ]
    expect(staleAtLimitIn(states, NOW)).toEqual([{ slug: "three" }, { slug: "four" }])
  })

  test("no account answers no stale mark", () => {
    expect(staleAtLimitIn([], NOW)).toEqual([])
  })

  test("nothing here holds what it was handed", () => {
    const states = [stateAt("one", cutoff + 1)]
    const found = staleAtLimitIn(states, NOW)
    expect(found[0]).not.toBe(states[0])
  })
})
