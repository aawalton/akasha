export interface InstructionReferenceViolation {
  readonly file: string
  readonly line: number
  readonly value: string
}

const SCHEME_REFERENCE = /instructions:[a-z0-9-]+(?:\/[^\s"'`)\]]*)?/g

const BARE_DOCUMENT = /(?:domains|page-types|properties)\/[^\s"'`)\]]*\.md/g

const REPO_PATH = /[a-z0-9/._-]*repos\/instructions\/[^\s"'`)\]]*/g

const ADDRESS_TEMPLATE = /\$\{|<[a-z]/

interface Found {
  readonly start: number
  readonly end: number
  readonly value: string
}

function namedIn(text: string): readonly Found[] {
  const all: Found[] = []
  for (const pattern of [SCHEME_REFERENCE, BARE_DOCUMENT, REPO_PATH]) {
    for (const hit of text.matchAll(pattern)) {
      if (hit.index === undefined) continue
      if (ADDRESS_TEMPLATE.test(hit[0])) continue
      all.push({ start: hit.index, end: hit.index + hit[0].length, value: hit[0] })
    }
  }
  all.sort((a, b) => a.start - b.start || b.end - a.end)
  const kept: Found[] = []
  for (const one of all) {
    if (kept.some((held) => one.start >= held.start && one.end <= held.end)) continue
    kept.push(one)
  }
  return kept
}

export function scanForInstructionReferences(
  file: string,
  source: string
): readonly InstructionReferenceViolation[] {
  const out: InstructionReferenceViolation[] = []
  const lines = source.split("\n")
  for (const [index, text] of lines.entries()) {
    for (const found of namedIn(text)) {
      out.push({ file, line: index + 1, value: found.value })
    }
  }
  return out
}
