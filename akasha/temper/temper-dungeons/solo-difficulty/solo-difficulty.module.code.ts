export type SoloDifficulty = "easy" | "medium" | "hard" | "impossible"

export function getSoloDifficulty(
  dungeons: readonly { key: string; soloDifficulty?: SoloDifficulty }[],
  key: string
): SoloDifficulty {
  const found = dungeons.find((d) => d.key === key)
  return found?.soloDifficulty ?? "hard"
}
