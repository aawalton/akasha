export function levelIn(held: unknown): number | null {
  if (typeof held === "number") return Number.isFinite(held) ? held : null
  if (typeof held !== "string" || held.trim() === "") return null
  const said = Number(held)
  return Number.isFinite(said) ? said : null
}

export function gapIn(row: { safetyLevel?: unknown; difficultyLevel?: unknown }): number | null {
  const safety = levelIn(row.safetyLevel)
  const difficulty = levelIn(row.difficultyLevel)
  if (safety === null || difficulty === null) return null
  return safety - difficulty
}

export function multiplierFor(gap: number | null): number {
  if (gap === null) return 0
  if (gap >= 1) return 0
  if (gap >= 0) return 1 - gap
  const step = Math.round(gap * 2) / 2
  if (step <= -5) return 32
  if (step === -4.5) return 24
  if (step === -4) return 16
  if (step === -3.5) return 12
  if (step === -3) return 8
  if (step === -2.5) return 6
  if (step === -2) return 4
  if (step === -1.5) return 3
  if (step === -1) return 2
  if (step === -0.5) return 1.5
  return 1
}
