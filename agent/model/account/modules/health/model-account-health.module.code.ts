import {
  instantOf,
  type Marks,
} from "akasha/agent/model/account/modules/marking/model-account-marking.module.code.ts"
import type { RefreshOutcome } from "akasha/agent/model/account/modules/renewing/model-account-renewing.module.code.ts"

const TERMINAL_AT = "terminalAt"

const LAST_WINDOW_TRIGGER_AT = "lastWindowTriggerAt"

const TERMINAL_ALERTED_AT = "terminalAlertedAt"

const NOTHING: Marks = {}

type Health = "ok" | "terminal" | "retryable"

export function healthOf(outcome: RefreshOutcome): Health {
  if (outcome.ok) return "ok"
  return outcome.terminal ? "terminal" : "retryable"
}

function markedAt(key: string, now: number): Marks {
  const at = instantOf(now)
  return at === null ? NOTHING : { [key]: at }
}

export function refreshHealthMarks(outcome: RefreshOutcome, now: number): Marks {
  if (healthOf(outcome) !== "terminal") return { [TERMINAL_AT]: null }
  return markedAt(TERMINAL_AT, now)
}

export function terminalHealthMarks(now: number): Marks {
  return markedAt(TERMINAL_AT, now)
}

export function windowTriggerMarks(now: number): Marks {
  return markedAt(LAST_WINDOW_TRIGGER_AT, now)
}

export function terminalAlertMarks(alertedAt: string | null): Marks {
  const held = alertedAt !== null && alertedAt.trim() !== "" ? alertedAt : null
  return { [TERMINAL_ALERTED_AT]: held }
}

type TokenTerminalAlert = "alert" | "clear-latch" | "none"

export type TokenTerminalGiven = {
  readonly refreshTerminal: boolean
  readonly refreshOk: boolean
  readonly accessTokenExpiresAtMs: number | null
  readonly alreadyAlertedAtMs: number | null
  readonly nowMs: number
}

export function decideTokenTerminalAlert(given: TokenTerminalGiven): TokenTerminalAlert {
  const tokenTerminal =
    given.refreshTerminal &&
    given.accessTokenExpiresAtMs !== null &&
    given.accessTokenExpiresAtMs <= given.nowMs
  if (tokenTerminal) return given.alreadyAlertedAtMs === null ? "alert" : "none"
  if (given.refreshOk && given.alreadyAlertedAtMs !== null) return "clear-latch"
  return "none"
}
