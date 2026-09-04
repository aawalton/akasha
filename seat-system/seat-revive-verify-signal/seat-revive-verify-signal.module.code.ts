export type ReviveVerifySignal = "revived" | "unverified" | "failed" | "benign"

const REVIVED_EXIT = 0

const UNVERIFIED_EXIT = 3

export function classifyReviveVerifyExit(exitCode: number): ReviveVerifySignal {
  if (exitCode === REVIVED_EXIT) return "revived"
  if (exitCode === UNVERIFIED_EXIT) return "unverified"
  return "failed"
}
