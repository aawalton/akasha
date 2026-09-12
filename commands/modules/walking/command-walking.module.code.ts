const WORD = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const UNDER = "-"

const SPACE = " "

export type Level = {
  readonly named: string
  readonly slug: string
  readonly type: string
  readonly path: string
  readonly parts: readonly string[]
}

export type Parting = (part: string) => readonly Level[]

export type Reached = {
  readonly held: number
  readonly found: readonly Level[]
  readonly above: readonly Level[]
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

function levelsNamed(parts: readonly string[], word: string, levelOf: Parting): readonly Level[] {
  const found: Level[] = []
  for (const part of parts) {
    for (const one of levelOf(part)) {
      if (one.named === word) found.push(one)
    }
  }
  return found
}

export function walkingIn(
  parts: readonly string[],
  argv: readonly string[],
  levelOf: Parting
): Reached | null {
  let under = parts
  let held = 0
  const above: Level[] = []
  let reached: Reached | null = null
  for (const word of wordsIn(argv)) {
    const found = levelsNamed(under, word, levelOf)
    const one = found[0]
    if (one === undefined) return reached
    held = held + 1
    reached = { held, found, above: [...above] }
    above.push(one)
    under = one.parts
  }
  return reached
}
