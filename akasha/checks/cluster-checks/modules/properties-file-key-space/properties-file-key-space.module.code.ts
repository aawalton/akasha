import ts from "typescript"

export const PROPERTIES_FILE_CANONICAL_KEY = "propertySlug"

export const PROPERTIES_FILE_WRONG_KEY = "propertyId"

export const KEY_SPACE_SCAN_BOUND: readonly string[] = [
  "a comment stating the key space with other fields beside it, or with the brace never closed — a comment is read for the CLOSED one-entry form only. A comment paraphrasing the record literal below it, whose field really does carry this name, is an accurate sentence rather than a claim about a properties file, and comments of that shape stand in this tree. What that costs is a key space written with a second field after it, or trailing off before its closing brace, which is not matched.",
  "prose with no brace form — 'keys are property-definition ids' states the same wrong key space in words and is not matched. Only the braced map form is.",
  "non-TypeScript carriers — markdown docs, shell --help text, and help stored outside .ts/.tsx source.",
  "spelling variants — propertyID, property_id, and any casing other than the exact camelCase key.",
  "runtime-assembled help — a key space concatenated from variables rather than written as one literal. This gate's own tests use that idiom deliberately, so its specimens are not violations of it.",
]

const KEY_SPACE_RE = /\{\s*propertyId\s*:/g

const COMMENT_KEY_SPACE_RE = /\{\s*propertyId\s*:(?=[^,{}]*\})/g

export interface KeySpaceClaim {
  readonly text: string
  readonly line: number
}

function scriptKindFor(filePath: string): ts.ScriptKind {
  if (filePath.endsWith(".tsx")) return ts.ScriptKind.TSX
  if (filePath.endsWith(".jsx")) return ts.ScriptKind.JSX
  if (filePath.endsWith(".js") || filePath.endsWith(".mjs") || filePath.endsWith(".cjs")) {
    return ts.ScriptKind.JS
  }
  return ts.ScriptKind.TS
}

function claimsInSpan(
  sf: ts.SourceFile,
  start: number,
  end: number,
  re: RegExp
): readonly KeySpaceClaim[] {
  const raw = sf.text.slice(start, end)
  const out: KeySpaceClaim[] = []
  for (const match of raw.matchAll(re)) {
    if (match.index === undefined) continue
    out.push({
      text: match[0],
      line: ts.getLineAndCharacterOfPosition(sf, start + match.index).line + 1,
    })
  }
  return out
}

function claimsIn(node: ts.Node, sf: ts.SourceFile): readonly KeySpaceClaim[] {
  return claimsInSpan(sf, node.getStart(sf), node.getEnd(), KEY_SPACE_RE)
}

function commentSpans(sf: ts.SourceFile): ReadonlyArray<readonly [number, number]> {
  const spans: Array<readonly [number, number]> = []
  const seen = new Set<number>()

  function visit(node: ts.Node): undefined {
    for (const child of node.getChildren(sf)) {
      for (const range of ts.getLeadingCommentRanges(sf.text, child.getFullStart()) ?? []) {
        if (seen.has(range.pos)) continue
        seen.add(range.pos)
        spans.push([range.pos, range.end])
      }
      visit(child)
    }
  }

  visit(sf)
  return spans
}

export function scanPropertiesFileKeySpace(
  source: string,
  filePath: string
): readonly KeySpaceClaim[] {
  const sf = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    false,
    scriptKindFor(filePath)
  )
  const out: KeySpaceClaim[] = []

  function visit(node: ts.Node): undefined {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      out.push(...claimsIn(node, sf))
      return
    }
    if (ts.isTemplateExpression(node)) {
      out.push(...claimsIn(node.head, sf))
      for (const span of node.templateSpans) {
        out.push(...claimsIn(span.literal, sf))
        visit(span.expression)
      }
      return
    }
    ts.forEachChild(node, visit)
  }

  ts.forEachChild(sf, visit)
  for (const [start, end] of commentSpans(sf)) {
    out.push(...claimsInSpan(sf, start, end, COMMENT_KEY_SPACE_RE))
  }
  return out.sort((a, b) => a.line - b.line)
}

export const CANARY_FIXTURE =
  "infra/cluster-checks/__fixtures__/properties-file-key-space/canary.ts"

export const CANARY_EXPECTED: readonly string[] = [
  `25:{ ${PROPERTIES_FILE_WRONG_KEY}:`,
  `28:{ ${PROPERTIES_FILE_WRONG_KEY}:`,
  `30:{ ${PROPERTIES_FILE_WRONG_KEY}:`,
  `32:{${PROPERTIES_FILE_WRONG_KEY}:`,
  `36:{ ${PROPERTIES_FILE_WRONG_KEY}:`,
  `42:{ ${PROPERTIES_FILE_WRONG_KEY}:`,
  `46:{ ${PROPERTIES_FILE_WRONG_KEY}:`,
  `49:{ ${PROPERTIES_FILE_WRONG_KEY}:`,
]

export function canaryDisagreement(source: string): string | null {
  const found = scanPropertiesFileKeySpace(source, CANARY_FIXTURE).map(
    (c) => `${String(c.line)}:${c.text}`
  )
  const expected = [...CANARY_EXPECTED].sort()
  const actual = [...found].sort()
  if (expected.length === actual.length && expected.every((t, i) => t === actual[i])) return null
  return (
    "canary scan disagrees with its declared expectation.\n" +
    `  expected: ${expected.join(", ")}\n` +
    `  actual:   ${actual.join(", ")}`
  )
}
