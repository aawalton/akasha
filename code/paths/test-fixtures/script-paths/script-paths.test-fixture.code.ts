const LINES = "\n"

const ROOT = "AKASHA_ROOT"

const PLAIN = '"$AKASHA_ROOT/'

const BRACED = '"${AKASHA_ROOT}/'

const DEFAULTED = '"${AKASHA_ROOT:-'

const QUOTE = '"'

const UNDER = "/"

const OPENS = "{"

const SHUTS = "}"

const EXPANDS = ["$", "`"]

function pastDefault(line: string, at: number): number | null {
  let depth = 1
  let cursor = at
  while (cursor < line.length && depth > 0) {
    const here = line[cursor]
    if (here === OPENS) depth += 1
    else if (here === SHUTS) depth -= 1
    cursor += 1
  }
  return depth > 0 ? null : cursor
}

function nameStartsAt(line: string, at: number): number | null {
  if (line.startsWith(PLAIN, at)) return at + PLAIN.length
  if (line.startsWith(BRACED, at)) return at + BRACED.length
  if (!line.startsWith(DEFAULTED, at)) return null
  const past = pastDefault(line, at + DEFAULTED.length)
  if (past === null || line[past] !== UNDER) return null
  return past + 1
}

function namesOn(line: string): readonly string[] {
  if (!line.includes(ROOT)) return []
  const found: string[] = []
  let at = 0
  while (at < line.length) {
    const start = nameStartsAt(line, at)
    if (start === null) {
      at += 1
      continue
    }
    const shut = line.indexOf(QUOTE, start)
    if (shut < 0) break
    at = shut + 1
    const said = line.slice(start, shut)
    if (said.length > 0 && !EXPANDS.some((one) => said.includes(one))) found.push(said)
  }
  return found
}

export function namedIn(script: string): readonly string[] {
  return script.split(LINES).flatMap((line) => namesOn(line))
}
