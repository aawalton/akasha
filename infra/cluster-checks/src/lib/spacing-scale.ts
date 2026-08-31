const PX_PER_REM = 16

interface CssStep {
  readonly cssVar: string
  readonly px: number
}

interface SwiftStep {
  readonly swiftName: string
  readonly px: number
}

export type DimensionKind = "spacing" | "minLength" | "padding" | "lineWidth"

export interface DimensionLiteral {
  readonly file: string
  readonly kind: DimensionKind
  readonly value: number
  readonly line: number
}

export interface SpacingViolation {
  readonly message: string
  readonly reason:
    | "missing-in-swift"
    | "unknown-in-swift"
    | "mismatch"
    | "literal"
    | "exception-count"
    | "exception-unused"
  readonly at: string
}

export interface SpacingException {
  readonly file: string
  readonly kind: DimensionKind
  readonly value: number
  readonly count: number
  readonly reason: string
}

export const SPACING_EXCEPTIONS: readonly SpacingException[] = [
  {
    file: "ring.ios-component.swift.swift",
    kind: "lineWidth",
    value: 12,
    count: 1,
    reason:
      "what a large ring's stroke weighs, written once for the three tiles that draw one — a stroke weight is a drawing width, not a distance between two things, so no step on the scale describes it. It stood on ClaudeUsageView.swift twice, for that ring's track and fill, until #18970 gave every ring one authored drawing; the rings pass it rather than writing it, and it is deliberately spelled `lineWidth:` at the one place it survives so that this list still has to carry a reason for it",
  },
  {
    file: "ClaudeUsageView.swift",
    kind: "spacing",
    value: 1,
    count: 1,
    reason:
      "the gap between the ring's figure and its percent sign — the two share a baseline, a minimumScaleFactor and a lineLimit and scale as one number, so this is letter-spacing rather than two elements placed near each other",
  },
]

const CSS_SPACING_RE = /--(spacing-[\w-]+)\s*:\s*([0-9.]+)rem\s*;/g
const SWIFT_SPACING_RE = /^\s*let\s+(SPACING_[A-Z0-9_]+)\s*:\s*CGFloat\s*=\s*([0-9.]+)\s*$/gm

function parseCssSpacing(cssText: string): readonly CssStep[] {
  const out: CssStep[] = []
  for (const match of cssText.matchAll(CSS_SPACING_RE)) {
    const cssVar = match[1]
    if (cssVar === undefined) continue
    out.push({ cssVar, px: Number(match[2]) * PX_PER_REM })
  }
  return out
}

function parseSwiftSpacing(swiftText: string): readonly SwiftStep[] {
  const out: SwiftStep[] = []
  for (const match of swiftText.matchAll(SWIFT_SPACING_RE)) {
    const swiftName = match[1]
    if (swiftName === undefined) continue
    out.push({ swiftName, px: Number(match[2]) })
  }
  return out
}

function swiftNameFor(cssVar: string): string {
  return cssVar.toUpperCase().replaceAll("-", "_")
}

function cssVarFor(swiftName: string): string {
  return swiftName.toLowerCase().replaceAll("_", "-")
}

export function findScaleDrift(cssText: string, swiftText: string): readonly SpacingViolation[] {
  const cssSteps = parseCssSpacing(cssText)
  const swiftSteps = parseSwiftSpacing(swiftText)

  if (cssSteps.length === 0) {
    return [
      {
        message:
          "no --spacing-* declarations found in tokens.css; the scale is the authoritative side and cannot be empty",
        reason: "missing-in-swift",
        at: "tokens.css",
      },
    ]
  }

  const bySwiftName = new Map(swiftSteps.map((step) => [step.swiftName, step]))
  const violations: SpacingViolation[] = []
  const expected = new Set<string>()

  for (const step of cssSteps) {
    const swiftName = swiftNameFor(step.cssVar)
    expected.add(swiftName)
    const swiftStep = bySwiftName.get(swiftName)
    if (swiftStep === undefined) {
      violations.push({
        message: `--${step.cssVar} (${step.px}px) has no ${swiftName} in the spacing component; add \`let ${swiftName}: CGFloat = ${step.px}\``,
        reason: "missing-in-swift",
        at: step.cssVar,
      })
      continue
    }
    if (swiftStep.px !== step.px) {
      violations.push({
        message: `${swiftName} = ${swiftStep.px} drifted from --${step.cssVar} (${step.px}px); tokens.css is authoritative, so update the spacing component to match it`,
        reason: "mismatch",
        at: step.cssVar,
      })
    }
  }

  for (const step of swiftSteps) {
    if (expected.has(step.swiftName)) continue
    violations.push({
      message: `${step.swiftName} = ${step.px} is in the spacing component with no --${cssVarFor(step.swiftName)} in tokens.css; a step invented on the native side is not part of the scale`,
      reason: "unknown-in-swift",
      at: step.swiftName,
    })
  }

  return violations.sort((a, b) => a.at.localeCompare(b.at))
}

function stripStringsAndComments(source: string): string {
  const withoutStrings = source.replace(/"(?:[^"\\\n]|\\.)*"/g, '""')
  return withoutStrings.replace(/\/\/.*$/gm, "")
}

const LABELLED_RE =
  /\b(spacing|horizontalSpacing|verticalSpacing|minLength|lineWidth)\s*:\s*(-?[0-9]+(?:\.[0-9]+)?)/g
const POSITIONAL_PADDING_RE = /\.padding\(\s*(?:\.\w+\s*,\s*)?(-?[0-9]+(?:\.[0-9]+)?)\s*\)/g

const LABELLED_KINDS: Readonly<Record<string, DimensionKind>> = {
  spacing: "spacing",
  horizontalSpacing: "spacing",
  verticalSpacing: "spacing",
  minLength: "minLength",
  lineWidth: "lineWidth",
}

export function findDimensionLiterals(file: string, source: string): readonly DimensionLiteral[] {
  const out: DimensionLiteral[] = []
  stripStringsAndComments(source)
    .split("\n")
    .forEach((text, index) => {
      const line = index + 1
      for (const match of text.matchAll(LABELLED_RE)) {
        const kind = LABELLED_KINDS[match[1] ?? ""]
        if (kind === undefined) continue
        out.push({ file, kind, value: Number(match[2]), line })
      }
      for (const match of text.matchAll(POSITIONAL_PADDING_RE)) {
        out.push({ file, kind: "padding", value: Number(match[1]), line })
      }
    })
  return out
}

const keyOf = (d: { file: string; kind: DimensionKind; value: number }): string =>
  `${d.file} ${d.kind} ${d.value}`

export function judgeLiterals(
  literals: readonly DimensionLiteral[],
  exceptions: readonly SpacingException[] = SPACING_EXCEPTIONS
): readonly SpacingViolation[] {
  const byKey = new Map<string, DimensionLiteral[]>()
  for (const literal of literals) {
    const key = keyOf(literal)
    const bucket = byKey.get(key)
    if (bucket === undefined) byKey.set(key, [literal])
    else bucket.push(literal)
  }

  const violations: SpacingViolation[] = []
  const allowed = new Map(exceptions.map((e) => [keyOf(e), e]))

  for (const [key, found] of byKey) {
    const exception = allowed.get(key)
    const first = found[0]
    if (first === undefined) continue
    if (exception === undefined) {
      for (const literal of found) {
        violations.push({
          message: `${literal.file}:${literal.line}: \`${literal.kind}\` written as ${literal.value}; take the step by name from the spacing component, or add an entry to SPACING_EXCEPTIONS saying why no step describes it`,
          reason: "literal",
          at: `${literal.file}:${String(literal.line).padStart(4, "0")}`,
        })
      }
      continue
    }
    if (found.length !== exception.count) {
      violations.push({
        message: `${first.file}: \`${first.kind}: ${first.value}\` appears ${found.length} time(s) and SPACING_EXCEPTIONS allows ${exception.count}, on line(s) ${found.map((f) => f.line).join(", ")}; a new one needs its own reason, so update the entry or take the step by name`,
        reason: "exception-count",
        at: `${first.file}:${String(first.line).padStart(4, "0")}`,
      })
    }
  }

  for (const exception of exceptions) {
    if (byKey.has(keyOf(exception))) continue
    violations.push({
      message: `SPACING_EXCEPTIONS holds \`${exception.kind}: ${exception.value}\` for ${exception.file} and nothing there matches it; the exception has outlived what it described and should be removed`,
      reason: "exception-unused",
      at: `${exception.file}:0000`,
    })
  }

  return violations.sort((a, b) => a.at.localeCompare(b.at))
}
