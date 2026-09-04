import {
  type Literal,
  literalsInRange,
  maskSource,
  matchDelimiter,
  matchEnds,
} from "../swift-masked-source/swift-masked-source.module.code.ts"

const FORBIDDEN_WORD = "apple"

export type IntentStringSurface = "IntentDescription" | "title" | "shortTitle" | "phrases"

export interface AppIntentBrandWordViolation {
  readonly line: number
  readonly detail: string
  readonly file?: string
}

const SURFACE_ANCHORS: readonly { surface: IntentStringSurface; pattern: RegExp }[] = [
  { surface: "IntentDescription", pattern: /\bIntentDescription\b/g },
  { surface: "title", pattern: /\btitle\s*[:=]/g },
  { surface: "shortTitle", pattern: /\bshortTitle\s*[:=]/g },
  { surface: "phrases", pattern: /\bphrases\s*[:=]/g },
]

const BRACKETS: Readonly<Record<string, string>> = { "(": ")", "[": "]", "{": "}" }

function valueLiterals(
  masked: string,
  literals: readonly Literal[],
  from: number
): readonly Literal[] {
  const lineEnd = masked.indexOf("\n", from)
  const eol = lineEnd === -1 ? masked.length : lineEnd

  for (let i = from; i < eol; i++) {
    const ch = masked[i] ?? ""
    if (ch === '"') break
    const close = BRACKETS[ch]
    if (close === undefined) continue
    const closeIndex = matchDelimiter(masked, i, ch, close)
    if (closeIndex === -1) break
    return literalsInRange(literals, i, closeIndex)
  }

  const first = literalsInRange(literals, from, eol)[0]
  return first === undefined ? [] : [first]
}

export interface IntentString {
  readonly surface: IntentStringSurface
  readonly line: number
  readonly text: string
  readonly start: number
}

export function extractIntentStrings(seamText: string): readonly IntentString[] {
  return analyse(seamText).strings
}

function analyse(seamText: string): { masked: string; strings: readonly IntentString[] } {
  const { masked, literals } = maskSource(seamText)
  const found: IntentString[] = []
  const seen = new Set<string>()

  for (const { surface, pattern } of SURFACE_ANCHORS) {
    for (const end of matchEnds(masked, pattern)) {
      for (const l of valueLiterals(masked, literals, end)) {
        const key = `${surface} ${l.start}`
        if (seen.has(key)) continue
        seen.add(key)
        found.push({ surface, line: l.line, text: l.text, start: l.start })
      }
    }
  }

  return { masked, strings: found }
}

const READ_CONSTRUCTS: readonly {
  label: string
  pattern: RegExp
  open: string
  close: string
  required: readonly IntentStringSurface[]
}[] = [
  {
    label: "App Intent",
    pattern: /\bstruct\s+\w+\s*:\s*AppIntent\b/g,
    open: "{",
    close: "}",
    required: ["title", "IntentDescription"],
  },
  {
    label: "App Shortcut",
    pattern: /\bAppShortcut\s*\(/g,
    open: "(",
    close: ")",
    required: ["phrases", "shortTitle"],
  },
]

function lineAt(text: string, index: number): number {
  let line = 1
  for (let i = 0; i < index && i < text.length; i++) if (text[i] === "\n") line += 1
  return line
}

function findUnreadSurfaces(
  seamText: string,
  masked: string,
  strings: readonly IntentString[]
): readonly AppIntentBrandWordViolation[] {
  const violations: AppIntentBrandWordViolation[] = []

  for (const { label, pattern, open, close, required } of READ_CONSTRUCTS) {
    for (const end of matchEnds(masked, pattern)) {
      const openIndex = masked.indexOf(open, end - 1)
      if (openIndex === -1) continue
      const closeIndex = matchDelimiter(masked, openIndex, open, close)
      if (closeIndex === -1) continue

      for (const surface of required) {
        const wasRead = strings.some(
          (s) =>
            s.surface === surface &&
            s.start >= openIndex &&
            s.start < closeIndex &&
            s.text.trim() !== ""
        )
        if (wasRead) continue
        violations.push({
          line: lineAt(seamText, openIndex),
          detail: `this ${label} yields no \`${surface}\` string with a body, so a surface Apple rejects on went unexamined. If the construct moved, was reformatted, or was written in a quoting or binding form this scanner cannot read, update this check; do not delete it and do not exempt the construct.`,
        })
      }
    }
  }

  return violations
}

export function findMissingAppIntentViolations(
  seamText: string
): readonly AppIntentBrandWordViolation[] {
  if (/\bstruct\s+\w+\s*:\s*AppIntent\b/.test(analyse(seamText).masked)) return []
  return [
    {
      line: 0,
      detail:
        "no `struct …: AppIntent` could be found in the seam at all — either the App Intents left this file or this scanner can no longer see them, and it is verifying nothing. If they moved, point this check at where they went; do not delete it.",
    },
  ]
}

export function findAppIntentBrandWordViolations(
  seamText: string,
  options?: { readonly requireIntentPresent?: boolean }
): readonly AppIntentBrandWordViolation[] {
  const { masked, strings } = analyse(seamText)
  const violations: AppIntentBrandWordViolation[] = []

  violations.push(...findUnreadSurfaces(seamText, masked, strings))
  if (options?.requireIntentPresent !== false) {
    violations.push(...findMissingAppIntentViolations(seamText))
  }

  for (const s of strings) {
    if (!s.text.toLowerCase().includes(FORBIDDEN_WORD)) continue
    violations.push({
      line: s.line,
      detail: `App Intent ${s.surface} contains the forbidden word "${FORBIDDEN_WORD}" — Apple rejects the upload with ITMS-90626 after accepting it, burning a build number. Reword to drop the brand name (e.g. "Apple Health" → "Health"). Found: "${s.text}"`,
    })
  }

  return violations
}
