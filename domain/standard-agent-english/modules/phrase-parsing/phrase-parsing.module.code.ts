import { partOfSpeech } from "akasha/domain/standard-agent-english/part-of-speech/part-of-speech.page-type.ts"

export type Rule = {
  readonly phraseKind: string
  readonly writtenFrom: readonly string[]
}

export type Lexicon = ReadonlyMap<string, ReadonlySet<string>>

const PART_OF_SPEECH = `${partOfSpeech.slug}/`

const MANY = 2

const CLITIC = "'s"

export function wordsIn(phrase: string): readonly string[] {
  const found: string[] = []
  for (const one of phrase.split(" ")) {
    if (one.length === 0) continue
    if (one.length > CLITIC.length && one.endsWith(CLITIC)) {
      found.push(one.slice(0, -CLITIC.length), CLITIC)
      continue
    }
    found.push(one)
  }
  return found
}

export function itemsIn(phrase: string, lexicon: Lexicon): readonly string[] {
  const words = wordsIn(phrase)
  let longest = 1
  for (const spelling of lexicon.keys()) {
    const many = spelling.split(" ").length
    if (many > longest) longest = many
  }
  const found: string[] = []
  let at = 0
  while (at < words.length) {
    let took = 1
    const most = words.length - at < longest ? words.length - at : longest
    for (let many = most; many > 1; many -= 1) {
      if (!lexicon.has(words.slice(at, at + many).join(" "))) continue
      took = many
      break
    }
    found.push(words.slice(at, at + took).join(" "))
    at += took
  }
  return found
}

export function waysIn(
  phrase: string,
  rules: readonly Rule[],
  lexicon: Lexicon,
  startSymbol: string
): number {
  const words = itemsIn(phrase, lexicon)
  const found = new Map<string, number>()
  const walking = new Set<string>()

  function capped(count: number): number {
    return count > MANY ? MANY : count
  }

  function spelt(item: string, at: number): boolean {
    const word = words[at]
    return word === undefined ? false : lexicon.get(word)?.has(item) === true
  }

  function overItems(items: readonly string[], at: number, from: number, to: number): number {
    const item = items[at]
    if (item === undefined) return from === to ? 1 : 0
    if (item.startsWith(PART_OF_SPEECH)) {
      if (from >= to || !spelt(item, from)) return 0
      return overItems(items, at + 1, from + 1, to)
    }
    let total = 0
    for (let split = from; split <= to; split += 1) {
      const left = waysOf(item, from, split)
      if (left === 0) continue
      total = capped(total + left * overItems(items, at + 1, split, to))
      if (total >= MANY) return MANY
    }
    return total
  }

  function waysOf(phraseKind: string, from: number, to: number): number {
    const key = `${phraseKind} ${from} ${to}`
    const already = found.get(key)
    if (already !== undefined) return already
    if (walking.has(key)) return 0
    walking.add(key)
    let total = 0
    for (const rule of rules) {
      if (rule.phraseKind !== phraseKind) continue
      total = capped(total + overItems(rule.writtenFrom, 0, from, to))
      if (total >= MANY) break
    }
    walking.delete(key)
    found.set(key, total)
    return total
  }

  return waysOf(startSymbol, 0, words.length)
}
