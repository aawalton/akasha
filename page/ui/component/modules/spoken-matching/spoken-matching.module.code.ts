const SPACE = /\s+/

const UNWORDED = /[^\p{L}\p{N}]/gu

const ENDS_SENTENCE = /[.!?…]["'”’)\]]*$/

const LEAD_MOST = 6

const LEAD_LEAST = 2

const SENTENCE_MOST = 80

const END_SLACK = 4

type Found = { readonly first: number; readonly last: number }

export function keyOf(word: string): string {
  return word.toLowerCase().replace(UNWORDED, "")
}

export function proseWords(prose: string): string[] {
  return prose.split(SPACE).filter((one) => one.length > 0)
}

function sentenceEnd(words: readonly string[], from: number): number {
  const most = Math.min(words.length, from + SENTENCE_MOST)
  for (let at = from; at < most; at += 1) {
    if (ENDS_SENTENCE.test(words[at] ?? "")) return at + 1
  }
  return most
}

export function spokenKeys(prose: string, from: number, to: number | null): string[] {
  const words = proseWords(prose)
  const end = to === null || to <= from ? sentenceEnd(words, from) : Math.min(to, words.length)
  return words
    .slice(from, end)
    .map(keyOf)
    .filter((one) => one !== "")
}

function leadsAt(
  keys: readonly string[],
  wanted: readonly string[],
  at: number,
  lead: number
): boolean {
  for (let one = 0; one < lead; one += 1) if (keys[at + one] !== wanted[one]) return false
  return true
}

function lastOf(keys: readonly string[], wanted: readonly string[], first: number): number {
  const guess = first + wanted.length - 1
  const tail = wanted[wanted.length - 1]
  let found = -1
  const top = Math.min(keys.length - 1, guess + END_SLACK)
  for (let at = Math.max(first, guess - END_SLACK); at <= top; at += 1) {
    if (keys[at] !== tail) continue
    if (found < 0 || Math.abs(at - guess) < Math.abs(found - guess)) found = at
  }
  return found >= 0 ? found : Math.min(keys.length - 1, guess)
}

export function foundIn(
  keys: readonly string[],
  wanted: readonly string[],
  near: number
): Found | null {
  if (wanted.length === 0 || keys.length === 0) return null
  const least = Math.min(LEAD_LEAST, wanted.length)
  for (let lead = Math.min(LEAD_MOST, wanted.length); lead >= least; lead -= 1) {
    let best = -1
    for (let at = 0; at + lead <= keys.length; at += 1) {
      if (!leadsAt(keys, wanted, at, lead)) continue
      if (best < 0 || Math.abs(at - near) < Math.abs(best - near)) best = at
    }
    if (best >= 0) return { first: best, last: lastOf(keys, wanted, best) }
  }
  return null
}
