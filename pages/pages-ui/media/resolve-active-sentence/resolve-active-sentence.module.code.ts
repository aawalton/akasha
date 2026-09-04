import type { SentenceMark } from "@akasha/voice-core/voice/mark-schema"

export function resolveActiveSentence(
  marks: readonly SentenceMark[],
  currentTime: number
): number | null {
  let lo = 0
  let hi = marks.length - 1
  let found: SentenceMark | null = null
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    const mark = marks[mid]
    if (mark !== undefined && mark.startSec <= currentTime) {
      found = mark
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  return found === null ? null : found.sentenceIndex
}
