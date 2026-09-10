import { besideAt } from "@akasha/pages/page-file-name"
import { textAt } from "@akasha/pages/page-value"
import type { Shadow } from "@akasha/pages/shadow"
import type { Text } from "../../../modules/change-walking/change-walking.module.code.ts"

export type Grant = {
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

export const GRANTS: readonly Grant[] = [
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

function swiftAt(shadow: Shadow, pageTypeSlug: string, slug: string): string {
  const named = shadow.index.listedAt(pageTypeSlug, slug)[0]
  if (named === undefined) {
    throw new Error(`the index files no \`${pageTypeSlug}/${slug}\`, so its Swift is unreachable`)
  }
  const value = shadow.index.pageByPath(named.path)
  const held = value === null ? null : textAt(value, SWIFT)
  const beside = held === null ? null : besideAt(named.path, SWIFT, held)
  if (beside === null) throw new Error(`${named.path} states no Swift file beside it`)
  return beside
}

export function passingIn(shadow: Shadow): Passing {
  return {
    granted: new Map(
      GRANTS.map((one) => [swiftAt(shadow, one.pageTypeSlug, one.slug), new Set(one.values)])
    ),
  }
}

export type Written = {
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

export function keyOf(one: Written): string {
  return `${one.kind} ${one.value}`
}

export function inSwift(source: string): readonly Written[] {
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

export function reasonsOver(passing: Passing): (given: Text) => readonly string[] {
  return (given) => found(passing, given.path, given.text)
}

const PASSING = new WeakMap<Shadow, Passing>()

function passingFor(shadow: Shadow): Passing {
  const held = PASSING.get(shadow)
  if (held !== undefined) return held
  const made = passingIn(shadow)
  PASSING.set(shadow, made)
  return made
}

export function foundIn(shadow: Shadow, path: string, text: string): readonly string[] {
  return found(passingFor(shadow), path, text)
}
