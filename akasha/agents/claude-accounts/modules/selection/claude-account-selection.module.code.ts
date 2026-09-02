import type { AccountState } from "../../../models/gateway/modules/oauth-types/oauth-types.module.code.ts"

const CEILING = 100

const NO_EXCLUDES: ReadonlySet<string> = new Set()

export type IneligibilityReason = "five-hour-maxed" | "seven-day-maxed"

export type EligibilityExplanation = {
  readonly eligible: boolean
  readonly reasons: readonly IneligibilityReason[]
}

export type PoolSummary = {
  readonly eligibleCount: number
  readonly totalCount: number
  readonly earliestEligibleResetMs: number | null
}

export type HoursUntilReset = (args: {
  readonly now: number
  readonly sevenDayResetsAt: string | null
}) => number

export type AccountCandidate = {
  readonly account: string
  readonly subscriptionType?: string | null
}

export type AccountPick<T> = {
  readonly candidate: T
  readonly state: AccountState
}

function instantOf(iso: string | null): number | null {
  if (iso === null) return null
  const at = Date.parse(iso)
  return Number.isNaN(at) ? null : at
}

export function explainAccountEligibility(state: AccountState): EligibilityExplanation {
  const reasons: IneligibilityReason[] = []
  if (state.fiveHourUtil >= CEILING) reasons.push("five-hour-maxed")
  if (state.sevenDayUtil >= CEILING) reasons.push("seven-day-maxed")
  return { eligible: reasons.length === 0, reasons }
}

function isAccountEligible(state: AccountState): boolean {
  return explainAccountEligibility(state).eligible
}

export function formatPoolEligibilityBreakdown(states: readonly AccountState[]): string {
  return states
    .map((state) => {
      const { eligible, reasons } = explainAccountEligibility(state)
      return `${state.account}=${eligible ? "eligible" : reasons.join(",")}`
    })
    .join(" ")
}

function accountEligibleAgainMs(state: AccountState): number | null {
  const blocking: (string | null)[] = []
  if (state.fiveHourUtil >= CEILING) blocking.push(state.fiveHourResetsAt)
  if (state.sevenDayUtil >= CEILING) blocking.push(state.sevenDayResetsAt)
  if (blocking.length === 0) return null
  const known: number[] = []
  for (const iso of blocking) {
    const at = instantOf(iso)
    if (at === null) return null
    known.push(at)
  }
  return Math.max(...known)
}

export function summarizePool(states: readonly AccountState[]): PoolSummary {
  let eligibleCount = 0
  let earliest: number | null = null
  for (const state of states) {
    if (isAccountEligible(state)) {
      eligibleCount += 1
      continue
    }
    const again = accountEligibleAgainMs(state)
    if (again !== null && (earliest === null || again < earliest)) earliest = again
  }
  return { eligibleCount, totalCount: states.length, earliestEligibleResetMs: earliest }
}

function aheadOf(
  one: AccountState,
  two: AccountState,
  now: number,
  hoursUntilReset: HoursUntilReset
): number {
  const at = hoursUntilReset({ now, sevenDayResetsAt: one.sevenDayResetsAt })
  const to = hoursUntilReset({ now, sevenDayResetsAt: two.sevenDayResetsAt })
  if (at !== to) return at - to
  if (one.sevenDayUtil !== two.sevenDayUtil) return one.sevenDayUtil - two.sevenDayUtil
  if (one.fiveHourUtil !== two.fiveHourUtil) return one.fiveHourUtil - two.fiveHourUtil
  return one.account < two.account ? -1 : one.account > two.account ? 1 : 0
}

function selectAccount(
  states: readonly AccountState[],
  now: number,
  hoursUntilReset: HoursUntilReset
): AccountState | null {
  let best: AccountState | null = null
  for (const state of states) {
    if (!isAccountEligible(state)) continue
    if (best === null || aheadOf(state, best, now, hoursUntilReset) < 0) best = state
  }
  return best
}

function defaultState(candidate: AccountCandidate): AccountState {
  return {
    account: candidate.account,
    fiveHourUtil: 0,
    sevenDayUtil: 0,
    sevenDayResetsAt: null,
    fiveHourResetsAt: null,
    subscriptionType: candidate.subscriptionType ?? null,
    subscriptionDisabled: false,
    fiveHourAtLimitUntil: null,
    renewalTerminal: false,
    accessTokenExpiresAt: null,
  }
}

export function selectBestAccount<T extends AccountCandidate>(args: {
  readonly candidates: readonly T[]
  readonly states: ReadonlyMap<string, AccountState>
  readonly now: number
  readonly hoursUntilReset: HoursUntilReset
  readonly excludes?: ReadonlySet<string>
}): AccountPick<T> | null {
  const excludes = args.excludes ?? NO_EXCLUDES
  const pool: AccountPick<T>[] = []
  for (const candidate of args.candidates) {
    if (excludes.has(candidate.account)) continue
    pool.push({ candidate, state: args.states.get(candidate.account) ?? defaultState(candidate) })
  }
  const picked = selectAccount(
    pool.map((one) => one.state),
    args.now,
    args.hoursUntilReset
  )
  if (picked === null) return null
  return pool.find((one) => one.state.account === picked.account) ?? null
}

export function parseFutureIsoMs(iso: string | null, now: number): number | null {
  const at = instantOf(iso)
  if (at === null) return null
  return at > now ? at : null
}
