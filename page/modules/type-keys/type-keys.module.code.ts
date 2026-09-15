const COMPOSED = /["'`] {2}pageTypeSlug: /

const DECLARED = /^\s*(?:readonly )?pageTypeSlug\??:/

const STATED = / {2}type: /

export function composesAPageType(line: string): boolean {
  return COMPOSED.test(line) && !DECLARED.test(line)
}

export function statesTheTypeKey(line: string): boolean {
  return STATED.test(line)
}

export function linesComposingOneKey(body: string): readonly number[] {
  const lines = body.split("\n")
  const found: number[] = []
  lines.forEach((line, at) => {
    if (!composesAPageType(line)) return
    if (!statesTheTypeKey(lines[at + 1] ?? "")) found.push(at + 1)
  })
  return found
}
