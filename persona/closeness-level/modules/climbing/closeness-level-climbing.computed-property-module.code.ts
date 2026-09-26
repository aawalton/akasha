export const LADDER = "closeness-level/level-"

export function levelOf(points: number, rungAt: (level: number) => number | null): number {
  if (!Number.isFinite(points) || points <= 0) return 0
  let level = 0
  for (;;) {
    const rung = rungAt(level + 1)
    if (rung === null || points < rung) return level
    level += 1
  }
}
