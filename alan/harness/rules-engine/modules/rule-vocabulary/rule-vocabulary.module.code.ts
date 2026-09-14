const UNRECOGNIZED = "unrecognized"

export interface VocabularyEntry {
  readonly value: string
  readonly patterns: readonly string[]
}

export function normalize(entries: readonly VocabularyEntry[], text: string): string {
  const subject = text.toLowerCase()
  let bestPattern: string | null = null
  let bestValue: string = UNRECOGNIZED
  for (const entry of entries) {
    for (const pattern of entry.patterns) {
      if (!subject.includes(pattern)) continue
      if (bestPattern === null || pattern.length > bestPattern.length) {
        bestPattern = pattern
        bestValue = entry.value
        continue
      }
      if (pattern.length === bestPattern.length && pattern < bestPattern) {
        bestPattern = pattern
        bestValue = entry.value
      }
    }
  }
  return bestValue
}
