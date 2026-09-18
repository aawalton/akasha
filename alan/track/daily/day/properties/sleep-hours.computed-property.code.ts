import type { WorkedDay } from "akasha/alan/track/daily/day/day.page-type.ts"
import {
  openUntil,
  stretchHours,
} from "akasha/alan/track/daily/day/modules/stretch-hours/stretch-hours.computed-property-module.code.ts"
import type { SleepHours } from "akasha/alan/track/daily/day/properties/sleep-hours.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

const WORD_CHARACTER = /[\p{L}\p{N}]/u

const SLEEPING = ["sleep", "rest"] as const

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

export const work: Work<WorkedDay, SleepHours> = (page) => {
  const rows = page.sessions
  if (!Array.isArray(rows)) return null
  const until = openUntil(page.date)
  let hours = 0
  for (const row of rows) {
    const title = typeof row.title === "string" ? row.title : ""
    if (!SLEEPING.some((word) => hasWord(title, word))) continue
    hours += stretchHours(row.startTime, row.endTime, until) ?? 0
  }
  return hours
}
