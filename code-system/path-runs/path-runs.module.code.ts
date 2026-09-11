const APART = /[^\w./-]+/

const UNDER = "/"

const LINES = "\n"

export type Run = {
  readonly line: number
  readonly said: readonly string[]
}

function tailsOf(run: string): readonly string[] {
  const found = [run]
  for (let at = run.indexOf(UNDER); at >= 0; at = run.indexOf(UNDER, at + 1)) {
    found.push(run.slice(at + 1))
  }
  return found
}

export function runsIn(text: string): readonly Run[] {
  const found: Run[] = []
  const lines = text.split(LINES)
  for (let at = 0; at < lines.length; at += 1) {
    const line = lines[at]
    if (line === undefined || !line.includes(UNDER)) continue
    for (const run of line.split(APART)) {
      if (run.includes(UNDER)) found.push({ line: at + 1, said: tailsOf(run) })
    }
  }
  return found
}
