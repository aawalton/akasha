import type { Work } from "@akasha/pages/computed-property"
import type { WorkedWakeDay } from "../wake-day.page-type.ts"

const AN_HOUR = 3600000

// The stretch's hours, read either way round, and nothing where either end is unreadable.
function hoursBetween(from: unknown, to: unknown): number | null {
  if (typeof from !== "string" || typeof to !== "string") return null
  const start = Date.parse(from)
  const end = Date.parse(to)
  if (Number.isNaN(start) || Number.isNaN(end)) return null
  const hours = Math.abs(end - start) / AN_HOUR
  return Number.isFinite(hours) ? hours : null
}

// A row spells its levels as text, so the number that text spells is what a level is read as.
function levelIn(held: unknown): number | null {
  if (typeof held === "number") return Number.isFinite(held) ? held : null
  if (typeof held !== "string" || held.trim() === "") return null
  const said = Number(held)
  return Number.isFinite(said) ? said : null
}

// How many hours of stress capacity an hour of the stretch takes, by how far its safety sits
// above its difficulty. A stretch rated a full level safer than it is difficult costs nothing,
// and an unrated safety or difficulty costs nothing rather than counting as zero.
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

export const work: Work<WorkedWakeDay, number> = (page) => {
  const rows = page.sessions
  // A day with no stretches beside it holds no spend to add up, and is no reading rather than
  // a spend of nothing.
  if (!Array.isArray(rows)) return null
  const now = new Date().toISOString()
  let hours = 0
  for (const row of rows) {
    // A stretch still open counts up to now, which is the opposite of how sleep reads one.
    const ran = hoursBetween(row.startTime, row.endTime) ?? hoursBetween(row.startTime, now)
    // A stretch whose start cannot be read spans nothing that could be weighted.
    if (ran === null) continue
    hours += ran * multiplierFor(gapIn(row))
  }
  return hours
}
