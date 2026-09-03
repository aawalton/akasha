export const REVIVE_IO_VERDICTS = ["advancing", "wedged"] as const

export type ReviveIoVerdict = (typeof REVIVE_IO_VERDICTS)[number]

export interface ReviveIoVerifyInput {
  readonly transcriptMtimeMs: number | null
  readonly ownedRowUpdatedAtMs: number | null
  readonly reviveAtMs: number
}

export function lastAdvancementMs(...signals: readonly (number | null)[]): number | null {
  const held = signals.filter((one): one is number => one !== null)
  return held.length === 0 ? null : Math.max(...held)
}

export function decideReviveIoVerify(input: ReviveIoVerifyInput): ReviveIoVerdict {
  const lastIoMs = lastAdvancementMs(input.transcriptMtimeMs, input.ownedRowUpdatedAtMs)
  if (lastIoMs === null) return "wedged"
  return lastIoMs > input.reviveAtMs ? "advancing" : "wedged"
}
