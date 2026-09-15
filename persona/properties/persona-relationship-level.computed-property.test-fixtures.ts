export const RUNGS: Readonly<Record<number, number>> = {
  1: 7,
  2: 28,
  3: 88,
  4: 268,
  5: 808,
  6: 2428,
}

export const rungAt = (level: number): number | null => RUNGS[level] ?? null
