export const UNCERTAIN_BLOCK_ESCALATE_MS = 30 * 60_000

export interface UncertainBlockState {
  readonly sinceMs: number | null
  readonly escalated: boolean
}

export const INITIAL_UNCERTAIN_BLOCK_STATE: UncertainBlockState = {
  sinceMs: null,
  escalated: false,
}

export interface UncertainBlockReading {
  readonly blockedByUncertainClaimant: boolean
  readonly nowMs: number
  readonly boundMs: number
}

export function decideUncertainBlockEscalation(
  state: UncertainBlockState,
  input: UncertainBlockReading
): { state: UncertainBlockState; escalate: boolean } {
  if (!input.blockedByUncertainClaimant) {
    return { state: INITIAL_UNCERTAIN_BLOCK_STATE, escalate: false }
  }
  const sinceMs = state.sinceMs ?? input.nowMs
  const due = input.nowMs - sinceMs >= input.boundMs
  if (!due || state.escalated) {
    return { state: { sinceMs, escalated: state.escalated }, escalate: false }
  }
  return { state: { sinceMs, escalated: true }, escalate: true }
}

export interface UncertainBlockSeat {
  readonly seat: string
  readonly state: UncertainBlockState
  readonly reading: UncertainBlockReading
}

export interface UncertainBlockVerdict {
  readonly seat: string
  readonly state: UncertainBlockState
  readonly escalate: boolean
}

export function decideUncertainBlockBatch(
  seats: readonly UncertainBlockSeat[]
): UncertainBlockVerdict[] {
  return seats.map(({ seat, state, reading }) => {
    const { state: next, escalate } = decideUncertainBlockEscalation(state, reading)
    return { seat, state: next, escalate }
  })
}
