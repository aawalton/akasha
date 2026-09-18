import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { changeUncommitted } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const TYPE = "spotify-account"

const WINDOW_MS = 30_000

const HOLDS = 30

const WINDOW_STARTED_AT = "windowStartedAt"

const CALLS_IN_WINDOW = "callsInWindow"

const RETRY_ALLOWED_AT = "retryAllowedAt"

export type Slot = {
  readonly took: boolean
  readonly waitMs: number
  readonly banned: boolean
}

export function accountRoot(): string {
  return codeRoot()
}

export function accountAt(root: string = accountRoot()): string {
  const every = valuesOfType(root, TYPE)
  const one = every[0]
  if (one === undefined) {
    throw new Error(`no ${TYPE} page is in the index, so no call can be counted against one`)
  }
  return one.path
}

function instantOf(held: unknown): number {
  if (typeof held !== "string") return 0
  const at = Date.parse(held)
  return Number.isNaN(at) ? 0 : at
}

function isoOf(at: number): string {
  return new Date(at).toISOString()
}

export function slotTaken(now: number, root: string, page: string): Slot {
  let slot: Slot = { took: true, waitMs: 0, banned: false }
  changeUncommitted(root, page, (held) => {
    const values: Value = { ...(held ?? {}) }
    const allowed = instantOf(values[RETRY_ALLOWED_AT])
    if (allowed > now) {
      slot = { took: false, waitMs: allowed - now, banned: true }
      return values
    }
    const started = instantOf(values[WINDOW_STARTED_AT])
    if (now - started >= WINDOW_MS) {
      return { ...values, [WINDOW_STARTED_AT]: isoOf(now), [CALLS_IN_WINDOW]: 1 }
    }
    const counted = values[CALLS_IN_WINDOW]
    const spent = typeof counted === "number" && Number.isFinite(counted) ? counted : 0
    if (spent >= HOLDS) {
      slot = { took: false, waitMs: started + WINDOW_MS - now, banned: false }
      return values
    }
    return { ...values, [CALLS_IN_WINDOW]: spent + 1 }
  })
  return slot
}

export function refusedUntil(now: number, waitMs: number, root: string, page: string): undefined {
  changeUncommitted(root, page, (held) => ({
    ...(held ?? {}),
    [RETRY_ALLOWED_AT]: isoOf(now + waitMs),
  }))
}
