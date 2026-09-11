const PATHED = /[\w./-]+/g

const OPENED = /(?<![\w./$-])\$\{?[A-Za-z_]\w*\}?/g

const SIGIL = "$"

const CLOSED = "}"

const UNDER = "/"

const LINES = "\n"

export type Run = {
  readonly line: number
  readonly said: readonly string[]
  readonly rooted: boolean
}

function tailsOf(run: string): readonly string[] {
  const found = [run]
  for (let at = run.indexOf(UNDER); at >= 0; at = run.indexOf(UNDER, at + 1)) {
    found.push(run.slice(at + 1))
  }
  return found
}

function openedIn(line: string): ReadonlySet<number> {
  const found = new Set<number>()
  for (const one of line.matchAll(OPENED)) {
    const said = one[0]
    found.add(said.endsWith(CLOSED) ? one.index + said.length : one.index + SIGIL.length)
  }
  return found
}

export function runsIn(text: string): readonly Run[] {
  const found: Run[] = []
  const lines = text.split(LINES)
  for (let at = 0; at < lines.length; at += 1) {
    const line = lines[at]
    if (line === undefined || !line.includes(UNDER)) continue
    const opened = openedIn(line)
    for (const one of line.matchAll(PATHED)) {
      const run = one[0]
      if (!run.includes(UNDER)) continue
      found.push({ line: at + 1, said: tailsOf(run), rooted: opened.has(one.index) })
    }
  }
  return found
}
