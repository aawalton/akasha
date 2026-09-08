export const UNRECOGNIZED = "unrecognized"

export interface VocabularyEntry {
  readonly value: string
  readonly patterns: readonly string[]
}

const ENTRY = /^-\s+\*\*(.+?)\*\*\s*$/
const PATTERN = /^\s+-\s+`(.+)`\s*$/
const HEADING = /^#\s/

export function parseVocabulary(body: string): readonly VocabularyEntry[] {
  const lines = body.replace(/\r\n/g, "\n").split("\n")
  const start = lines.findIndex((line) => line.trim() === "# Vocabulary")
  if (start === -1) return []
  const entries: { value: string; patterns: string[] }[] = []
  for (const line of lines.slice(start + 1)) {
    if (HEADING.test(line)) break
    if (line.trim() === "") continue
    const asEntry = ENTRY.exec(line)
    if (asEntry !== null) {
      entries.push({ value: (asEntry[1] ?? "").toLowerCase(), patterns: [] })
      continue
    }
    const asPattern = PATTERN.exec(line)
    if (asPattern !== null)
      entries[entries.length - 1]?.patterns.push((asPattern[1] ?? "").toLowerCase())
  }
  return entries
}

export function valuesOf(entries: readonly VocabularyEntry[]): readonly string[] {
  return [...entries.map((one) => one.value), UNRECOGNIZED]
}

export function duplicated(entries: readonly VocabularyEntry[]): readonly string[] {
  const seen = new Map<string, string[]>()
  for (const entry of entries) {
    for (const pattern of entry.patterns) {
      const holders = seen.get(pattern) ?? []
      holders.push(entry.value)
      seen.set(pattern, holders)
    }
  }
  return [...seen.entries()]
    .filter(([, holders]) => holders.length > 1)
    .map(([pattern, holders]) => `\`${pattern}\` is claimed by ${holders.join(" and ")}`)
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
