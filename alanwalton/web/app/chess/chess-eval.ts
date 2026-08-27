const CP_TO_WIN_PROB_K = 0.004

export function evalToWhiteFraction(scoreWhitePov: number, scoreKind: "cp" | "mate"): number {
  if (scoreKind === "mate") {
    if (scoreWhitePov > 0) return 1
    if (scoreWhitePov < 0) return 0
    return 0.5
  }
  return 1 / (1 + Math.exp(-CP_TO_WIN_PROB_K * scoreWhitePov))
}

export function formatScore(scoreWhitePov: number, scoreKind: "cp" | "mate"): string {
  if (scoreKind === "mate") return `#${scoreWhitePov}`
  const pawns = scoreWhitePov / 100
  const sign = pawns > 0 ? "+" : ""
  return `${sign}${pawns.toFixed(2)}`
}
