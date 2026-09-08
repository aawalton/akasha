import { listedAt } from "@akasha/indexes"

const WORD = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const UNDER = "-"

export type Reached = {
  readonly named: string
  readonly held: number
  readonly found: readonly { readonly path: string }[]
}

export function wordsIn(argv: readonly string[]): readonly string[] {
  const words: string[] = []
  for (const one of argv) {
    if (!WORD.test(one)) break
    words.push(one)
  }
  return words
}

export function saidIn(argv: readonly string[], held: number): string {
  return argv.slice(0, held).join(" ")
}

function below(named: string, word: string): string {
  return named === "" ? word : `${named}${UNDER}${word}`
}

export function walkingIn(
  root: string,
  type: string | null,
  argv: readonly string[]
): Reached | null {
  if (type === null) return null
  let named = ""
  let held = 0
  let reached: Reached | null = null
  for (const word of wordsIn(argv)) {
    named = below(named, word)
    held = held + 1
    const found = listedAt(root, type, named)
    if (found.length > 0) reached = { named, held, found }
  }
  return reached
}
