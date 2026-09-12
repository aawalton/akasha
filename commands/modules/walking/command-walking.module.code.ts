import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const WORD = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const UNDER = "-"

const SPACE = " "

export type Reached = {
  readonly named: string
  readonly held: number
  readonly found: readonly { readonly path: string }[]
}

export type Naming = (slug: string) => string | null

export function wordsIn(argv: readonly string[]): readonly string[] {
  const words: string[] = []
  for (const one of argv) {
    if (!WORD.test(one)) break
    words.push(one)
  }
  return words
}

export function saidIn(argv: readonly string[], held: number): string {
  return argv.slice(0, held).join(SPACE)
}

export function pathOf(slug: string, namedAt: Naming): string {
  const words: string[] = []
  let rest = slug
  while (rest !== "") {
    const said = namedAt(rest)
    if (said === null || (said !== rest && !rest.endsWith(`${UNDER}${said}`))) {
      words.unshift(rest)
      break
    }
    words.unshift(said)
    rest = said === rest ? "" : rest.slice(0, rest.length - said.length - UNDER.length)
  }
  return words.join(SPACE)
}

function below(named: string, word: string): string {
  return named === "" ? word : `${named}${UNDER}${word}`
}

export function walkingIn(
  root: string,
  type: string | null,
  argv: readonly string[],
  namedAt: Naming
): Reached | null {
  if (type === null) return null
  let named = ""
  let held = 0
  let reached: Reached | null = null
  for (const word of wordsIn(argv)) {
    named = below(named, word)
    held = held + 1
    const said = namedAt(named)
    if (said !== null && said !== word) return reached
    const found = listedAt(root, type, named)
    if (found.length > 0) reached = { named, held, found }
  }
  return reached
}
