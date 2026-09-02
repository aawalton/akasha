export function addToTally(tally: Record<string, number>, key: string, n: number): undefined {
  tally[key] = (tally[key] ?? 0) + n
}
