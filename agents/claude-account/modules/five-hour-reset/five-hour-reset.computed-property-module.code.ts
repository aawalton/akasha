const CEILING = 100

export function fiveHourResetIn(sevenDaySpent: number | null, resetsAt: unknown): string | null {
  if (sevenDaySpent !== null && sevenDaySpent >= CEILING) return null
  return typeof resetsAt === "string" && resetsAt !== "" ? resetsAt : null
}
