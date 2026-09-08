import type { Work } from "@akasha/pages/computed-property"
import type { WorkedDay } from "../day.page-type.worked.ts"
import { hoursBetween } from "../modules/hours-between/hours-between.computed-property-module.code.ts"

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

export const work: Work<WorkedDay, number> = (page) => {
  const rows = page.sessions
  if (!Array.isArray(rows)) return null
  let hours = 0
  for (const row of rows) {
    const title = typeof row.title === "string" ? row.title : ""
    if (!SLEEPING.some((word) => hasWord(title, word))) continue
    hours += hoursBetween(row.startTime, row.endTime) ?? 0
  }
  return hours
}
