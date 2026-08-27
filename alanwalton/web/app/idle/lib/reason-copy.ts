export const REASON_COPY: Record<string, string> = {
  insufficient: "Not enough moments",
  "not-owned": "Not recruited yet",
  "already-owned": "Already recruited",
  locked: "Locked",
  ineligible: "Not eligible",
  "too-soon": "Not ready to ascend",
  "over-cap": "Lineup full",
  unknown: "Unavailable",
  signin: "Sign in first",
  error: "Something went wrong",
  rejected: "Action rejected",
}

export function reasonText(reason: string): string {
  return REASON_COPY[reason] ?? reason
}
