const NUMBER_WIDTH = 6

const TAB = "\t"

const FILE_PATH = "--file-path"

export type Run = {
  readonly from: number
  readonly through: number
  readonly of: number
  readonly numbered: string
}

export function linesOf(body: string): readonly string[] {
  const held = body.split("\n")
  if (held[held.length - 1] === "") held.pop()
  return held
}

export function countLines(body: string): number {
  return linesOf(body).length
}

function numberedAt(line: string, at: number): string {
  return `${String(at).padStart(NUMBER_WIDTH)}${TAB}${line}`
}

export function numbered(body: string): string {
  return linesOf(body)
    .map((line, at) => numberedAt(line, at + 1))
    .join("\n")
}

export function widthOf(line: string): number {
  return new TextEncoder().encode(line).length + 1
}

export function beganAt(lines: readonly string[], after: number): number {
  return after > 0 && after < lines.length ? after : 0
}

export function runFrom(lines: readonly string[], after: number, budget: number): Run | null {
  const of = lines.length
  const begun = beganAt(lines, after)
  const taken: string[] = []
  let held = 0
  for (let at = begun; at < of; at += 1) {
    const one = numberedAt(lines[at] ?? "", at + 1)
    const width = widthOf(one)
    if (held + width > budget) break
    held += width
    taken.push(one)
  }
  if (taken.length === 0) return null
  return { from: begun + 1, through: begun + taken.length, of, numbered: taken.join("\n") }
}

export function runLines(named: string, run: Run): readonly string[] {
  const reach =
    run.through === run.of
      ? "and the whole body has reached you now"
      : `and nothing after line ${run.through} has reached you`
  return [
    `${named} — lines ${run.from} through ${run.through} of ${run.of} follow, ${reach}`,
    run.numbered,
  ]
}

export function moreCall(calledAs: string, named: string, run: Run): readonly string[] {
  if (run.through >= run.of) return []
  return [
    `${named} is longer than one answer holds, so it comes back a run of lines at a time. The ` +
      `record holds line ${run.through} as how far this body has reached you, and it answers a ` +
      "write only once the whole body has. This call takes the run after it:",
    `${calledAs} ${FILE_PATH} ${named}`,
  ]
}

export function overCost(calledAs: string, named: string, of: number): number {
  const run = { from: of, through: of - 1, of, numbered: "" }
  const said = [...runLines(named, run), ...moreCall(calledAs, named, run)]
  return widthOf(said.join("\n")) - 1
}

export function tooWide(
  named: string,
  lines: readonly string[],
  after: number,
  budget: number
): string {
  const at = beganAt(lines, after) + 1
  const held = widthOf(numberedAt(lines[at - 1] ?? "", at)) - 1
  return (
    `${named} — line ${at} is ${held} bytes on its own, past the ${budget} this answer has left ` +
    "for it, and a read returns whole lines, so no call returns this body"
  )
}
