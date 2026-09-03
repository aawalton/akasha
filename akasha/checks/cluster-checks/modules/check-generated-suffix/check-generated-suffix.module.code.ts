import { z } from "zod"
import type { Violation } from "../../../../../tools/lib/check-workflow/violation-reporter.ts"

export const PRODUCTION_PARTICIPLES: readonly string[] = [
  "generated",
  "extracted",
  "emitted",
  "produced",
  "synthesi[sz]ed",
  "rendered",
  "scaffolded",
  "transpiled",
  "serialized",
  "materiali[sz]ed",
  "dumped",
]

export const AGENCY_ONLY_PARTICIPLES: readonly string[] = [
  "built",
  "written",
  "compiled",
  "derived",
  "exported",
]

export const MACHINE_AGENCY: readonly string[] = [
  "auto",
  "machine",
  "automatic(?:ally)?",
  "programmatic(?:ally)?",
  "codegen",
  "computer",
  "script",
]

const AGENT =
  "(?:script|tool|generator|emitter|watcher|compiler|codegen|bot|[\\w./-]+\\.(?:ts|tsx|js|mjs|py|sh|lua))"

const PRODUCTION = `(?:re)?(?:${PRODUCTION_PARTICIPLES.join("|")})`
const ANY_PRODUCTION = `(?:re)?(?:${[...PRODUCTION_PARTICIPLES, ...AGENCY_ONLY_PARTICIPLES].join("|")})`

const AGENCY_COMPOUND = new RegExp(
  `\\b(?:${MACHINE_AGENCY.join("|")})[-\\s]?${ANY_PRODUCTION}\\b`,
  "i"
)

const BY_AGENT = new RegExp(
  `\\b${PRODUCTION}\\b[^\\n]{0,70}?\\b(?:by|via|with|using)\\s+[^\\n]{0,40}?${AGENT}`,
  "i"
)

const SELF_REFERENCE = /\bthis\s+(?:file|module|source\s+file|artifact)\b/i

const SELF_REFERENCE_SPAN = 40

const QUOTED_OR_LISTED = /^(?:[-*+•>]|\d+[.)]|--|#|;|\/\/|\s)/

function commentBodyLines(block: string): readonly string[] {
  return block
    .replace(/\*+\/\s*$/, "")
    .split("\n")
    .map((line) => line.replace(/^\s*(?:\/\*+|\/\/+|\*+)/, "").replace(/^ /, ""))
}

function proseParagraphs(lines: readonly string[]): readonly string[] {
  const paragraphs: string[] = []
  let run: string[] = []
  for (const line of lines) {
    if (line.trim() === "" || QUOTED_OR_LISTED.test(line)) {
      if (run.length > 0) paragraphs.push(run.join(" "))
      run = []
      continue
    }
    run.push(line.trim())
  }
  if (run.length > 0) paragraphs.push(run.join(" "))
  return paragraphs
}

interface Span {
  readonly text: string
  readonly index: number
}

const MatchSpan = z.object({ text: z.string(), index: z.number() })

function parseSpan(match: RegExpExecArray | null): Span | null {
  return match === null ? null : MatchSpan.parse({ text: match[0], index: match.index })
}

function claimIn(sentence: string): Span | null {
  return parseSpan(AGENCY_COMPOUND.exec(sentence)) ?? parseSpan(BY_AGENT.exec(sentence))
}

export function declaresMachineProvenance(leadingComment: string): string | undefined {
  const lines = commentBodyLines(leadingComment)

  for (const paragraph of proseParagraphs(lines)) {
    for (const sentence of paragraph.split(/(?<=[.!?])\s+/)) {
      const claim = claimIn(sentence.replace(/\s+/g, " ").trim())
      if (claim !== null && claim.index === 0) return claim.text
    }
  }

  for (const raw of lines
    .map((l) => l.trim())
    .join("\n")
    .split(/(?<=[.!?])\s+|\n/)) {
    const sentence = raw.replace(/\s+/g, " ").trim()
    const self = parseSpan(SELF_REFERENCE.exec(sentence))
    if (self === null) continue
    const claim = claimIn(sentence)
    if (claim === null) continue
    if (claim.index > self.index && claim.index - self.index < SELF_REFERENCE_SPAN)
      return claim.text
  }

  return undefined
}

export function readLeadingComment(source: string): string {
  const lines = source.split("\n")
  let i = 0
  while (i < lines.length && (lines[i]?.trim() === "" || lines[i]?.startsWith("#!") === true)) i++

  const block: string[] = []
  if (lines[i]?.trim().startsWith("/*") === true) {
    while (i < lines.length) {
      block.push(lines[i] ?? "")
      if (lines[i]?.includes("*/") === true) break
      i++
    }
    return block.join("\n")
  }
  while (i < lines.length && lines[i]?.trim().startsWith("//") === true) {
    block.push(lines[i] ?? "")
    i++
  }
  return block.join("\n")
}

export interface SourceFileHeader {
  readonly file: string
  readonly header: string
}

export interface GeneratedSuffixViolation extends Violation {
  readonly file: string
  readonly marker: string
}

export function scanGeneratedSuffix(
  files: readonly SourceFileHeader[]
): readonly GeneratedSuffixViolation[] {
  const violations: GeneratedSuffixViolation[] = []
  for (const { file, header } of files) {
    if (file.endsWith(".generated.ts") || file.endsWith(".generated.tsx")) continue
    if (file.endsWith(".d.ts")) continue
    const marker = declaresMachineProvenance(header)
    if (marker !== undefined) violations.push({ file, marker })
  }
  return violations
}
