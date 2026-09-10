import type { Work } from "@akasha/pages/computed-property"
import type { WorkedDay } from "../day.page-type.worked.ts"
import { hoursBetween } from "../modules/hours-between/hours-between.computed-property-module.code.ts"

function levelIn(held: unknown): number | null {
  if (typeof held === "number") return Number.isFinite(held) ? held : null
  if (typeof held !== "string" || held.trim() === "") return null
  const said = Number(held)
  return Number.isFinite(said) ? said : null
}

function multiplierFor(gap: number | null): number {
  if (gap === null) return 0
  if (gap >= 1) return 0
  if (gap >= 0) return 1 - gap
  if (gap <= -5) return 32
  if (gap === -0.5) return 1.5
  if (gap === -1) return 2
  if (gap === -1.5) return 3
  if (gap === -2) return 4
  if (gap === -2.5) return 6
  if (gap === -3) return 8
  if (gap === -3.5) return 12
  if (gap === -4) return 16
  if (gap === -4.5) return 24
  return 0
}

function gapIn(row: { safetyLevel?: unknown; difficultyLevel?: unknown }): number | null {
  const safety = levelIn(row.safetyLevel)
  const difficulty = levelIn(row.difficultyLevel)
  if (safety === null || difficulty === null) return null
  return safety - difficulty
}

export const work: Work<WorkedDay, number> = (page) => {
  const rows = page.sessions
  if (!Array.isArray(rows)) return null
  const now = new Date().toISOString()
  let hours = 0
  for (const row of rows) {
    const ran = hoursBetween(row.startTime, row.endTime) ?? hoursBetween(row.startTime, now)
    if (ran === null) continue
    hours += ran * multiplierFor(gapIn(row))
  }
  return hours
}
