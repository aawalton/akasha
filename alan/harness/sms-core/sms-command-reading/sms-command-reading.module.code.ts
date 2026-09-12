import { filing } from "akasha/commands/modules/filling/command-filling.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

export const JSON_SAID = "--json"

export const TEXT = filing("--text")

export type Said = {
  readonly named: Readonly<Record<string, string>>
  readonly loose: readonly string[]
  readonly flags: ReadonlySet<string>
}

export type Reading<T> = T | { readonly refused: readonly string[] }

export function wordsIn(
  argv: readonly string[],
  valued: readonly string[],
  switches: readonly string[]
): Reading<Said> {
  const refusals: string[] = []
  const named: Record<string, string> = {}
  const loose: string[] = []
  const flags = new Set<string>()
  const takes = (word: string): boolean => valued.includes(word) || switches.includes(word)
  for (let at = 0; at < argv.length; at += 1) {
    const word = argv[at]
    if (word === undefined) continue
    if (switches.includes(word)) {
      flags.add(word)
      continue
    }
    if (valued.includes(word)) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || takes(value)) {
        refusals.push(`\`${word}\` names a value, and nothing that could be one followed it`)
        continue
      }
      if (named[word] !== undefined) {
        refusals.push(`\`${word}\` is said once, and it was said twice`)
        continue
      }
      named[word] = value
      continue
    }
    if (word.startsWith("--")) {
      const every = namesDrawn([...valued, ...switches])
      refusals.push(`\`${word}\` is no flag this takes — it takes ${every}`)
      continue
    }
    loose.push(word)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { named, loose, flags }
}
