import type { Work } from "@akasha/pages/computed-property"
import type { WorkedWakeDay } from "../wake-day.page-type.ts"

const AN_HOUR = 3600000

const WORD_CHARACTER = /[\p{L}\p{N}]/u

// A stretch counts as sleep when its title says one of these as a word of its own, so that
// `Read + Rest` counts and a title merely holding those letters does not.
const SLEEPING = ["sleep", "rest"] as const

// The stretch's hours, read either way round, and nothing where either end is unreadable.
function hoursBetween(from: unknown, to: unknown): number | null {
  if (typeof from !== "string" || typeof to !== "string") return null
  const start = Date.parse(from)
  const end = Date.parse(to)
  if (Number.isNaN(start) || Number.isNaN(end)) return null
  const hours = Math.abs(end - start) / AN_HOUR
  return Number.isFinite(hours) ? hours : null
}

// Letters and digits mark a word's edges, and case is ignored.
function hasWord(text: string, word: string): boolean {
  const inText = text.toLowerCase()
  const inWord = word.toLowerCase()
  let from = 0
  for (;;) {
    const found = inText.indexOf(inWord, from)
    if (found === -1) return false
    const before = found === 0 ? "" : inText.slice(found - 1, found)
    const after = inText.slice(found + inWord.length, found + inWord.length + 1)
    if (!WORD_CHARACTER.test(before) && !WORD_CHARACTER.test(after)) return true
    from = found + 1
  }
}

export const work: Work<WorkedWakeDay, number> = (page) => {
  const rows = page.sessions
  // A day with no stretches beside it holds no sleep to add up, and is no reading rather than
  // a sleep of nothing.
  if (!Array.isArray(rows)) return null
  let hours = 0
  for (const row of rows) {
    const title = typeof row.title === "string" ? row.title : ""
    if (!SLEEPING.some((word) => hasWord(title, word))) continue
    // A stretch still open counts nothing, rather than counting up to now.
    hours += hoursBetween(row.startTime, row.endTime) ?? 0
  }
  return hours
}
