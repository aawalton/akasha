import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { heldPerShadow, type Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

type Grant = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly values: readonly [string, ...(readonly string[])]
  readonly reason: string
}

export type Passing = {
  readonly granted: ReadonlyMap<string, ReadonlySet<string>>
}

const SWIFT = "swift"

const SWIFT_ENDING = ".swift"

const GRANTS: readonly Grant[] = [
  {
    pageTypeSlug: "ios-component",
    slug: "ring",
    values: ["lineWidth 12"],
    reason:
      "Alan grant 2026-09-08: a large ring's stroke weight, a drawing width rather than a distance between two things, so no step on the scale describes it.",
  },
  {
    pageTypeSlug: "ios-component",
    slug: "alanwalton-claude-usage-view",
    values: ["spacing 1"],
    reason:
      "Alan grant 2026-09-08: the gap between the ring's figure and its percent sign, which share a baseline and scale as one number, so it is letter-spacing rather than two elements placed apart.",
  },
]

export function swiftNamed(path: string): boolean {
  return path.endsWith(SWIFT_ENDING)
}

function swiftAt(paged: Paged, pageTypeSlug: string, slug: string): string {
  const named = paged.index.listedAt(pageTypeSlug, slug)[0]
  if (named === undefined) {
    throw new Error(`the index files no \`${pageTypeSlug}/${slug}\`, so its Swift is unreachable`)
  }
  const value = paged.index.pageByPath(named.path)
  const held = value === null ? null : textAt(value, SWIFT)
  const beside = held === null ? null : besideAt(named.path, SWIFT, held)
  if (beside === null) throw new Error(`${named.path} states no Swift file beside it`)
  return beside
}

export function passingIn(paged: Paged): Passing {
  return {
    granted: new Map(
      GRANTS.map((one) => [swiftAt(paged, one.pageTypeSlug, one.slug), new Set(one.values)])
    ),
  }
}

type Written = {
  readonly line: number
  readonly kind: string
  readonly value: string
}

const LABELLED_RE =
  /\b(spacing|horizontalSpacing|verticalSpacing|minLength|lineWidth)\s*:\s*(-?\d+(?:\.\d+)?)/g

const POSITIONAL_PADDING_RE = /\.padding\(\s*(?:\.\w+\s*,\s*)?(-?\d+(?:\.\d+)?)\s*\)/g

const KINDS: Readonly<Record<string, string>> = {
  spacing: "spacing",
  horizontalSpacing: "spacing",
  verticalSpacing: "spacing",
  minLength: "minLength",
  lineWidth: "lineWidth",
}

const PADDING = "padding"

const STRING_RE = /"(?:[^"\\\n]|\\.)*"/g

const LINE_COMMENT_RE = /\/\/[^\n]*/g

function spaced(one: string): string {
  return " ".repeat(one.length)
}

function blanked(source: string): string {
  return source.replace(STRING_RE, spaced).replace(LINE_COMMENT_RE, spaced)
}

function keyOf(one: Written): string {
  return `${one.kind} ${one.value}`
}

function inSwift(source: string): readonly Written[] {
  const said: Written[] = []
  const lines = blanked(source).split("\n")
  for (let at = 0; at < lines.length; at += 1) {
    const text = lines[at] ?? ""
    const line = at + 1
    for (const one of text.matchAll(LABELLED_RE)) {
      const kind = KINDS[one[1] ?? ""]
      if (kind === undefined) continue
      said.push({ line, kind, value: one[2] ?? "" })
    }
    for (const one of text.matchAll(POSITIONAL_PADDING_RE)) {
      said.push({ line, kind: PADDING, value: one[1] ?? "" })
    }
  }
  return said
}

function saidOf(one: Written): string {
  return `line ${one.line} writes the ${one.kind} ${one.value} out rather than taking it from a spacing step`
}

export function found(passing: Passing, path: string, text: string): readonly string[] {
  if (!swiftNamed(path)) return []
  const seen = inSwift(text)
  const granted = passing.granted.get(path)
  const kept = granted === undefined ? seen : seen.filter((one) => !granted.has(keyOf(one)))
  return kept.map(saidOf)
}

const passingFor = heldPerShadow(passingIn)

export function foundIn(shadow: Shadow, path: string, text: string): readonly string[] {
  return found(passingFor(shadow), path, text)
}
