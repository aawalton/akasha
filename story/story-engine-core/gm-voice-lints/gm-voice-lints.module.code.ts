import {
  parseProseIntoRawSegments,
  type RawProseSegment,
} from "../prose-segments/prose-segments.module.code.ts"

export interface ProseLintViolation {
  readonly lint: string
  readonly message: string
}

function proseRuns(text: string): readonly string[] {
  let segments: readonly RawProseSegment[]
  try {
    segments = parseProseIntoRawSegments(text)
  } catch {
    return text
      .split(/\n\n+/)
      .map((b) => b.trim())
      .filter((b) => b !== "")
  }
  return segments
    .filter((s): s is { kind: "prose"; text: string } => s.kind === "prose")
    .map((s) => s.text)
}

function lastLine(proseText: string): string {
  const lines = proseText
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l !== "")
  return lines.at(-1) ?? ""
}

function isQuoted(line: string): boolean {
  const first = line.charAt(0)
  const last = line.charAt(line.length - 1)
  const openers = new Set(['"', "'", "“", "‘", "«"])
  const closers = new Set(['"', "'", "”", "’", "»"])
  return openers.has(first) || closers.has(last)
}

const PROMPT_CLOSERS: readonly RegExp[] = [
  /\bwhat (do|will|would) you (do|choose|decide|say)\b/i,
  /\bwhat('?s| is) your (next )?(move|choice|decision|plan|call|play)\b/i,
  /\bwhat (do you do|now|next)\s*\?/i,
  /\byour (move|turn|choice|call|play)\b\s*[.!?]?$/i,
  /\bhow (do|will|would) you (respond|proceed|react|reply)\b/i,
  /\bwhat (happens )?(do you|will you)\b/i,
]

const MAX_CLOSER_WORDS = 8

const INLINE_SYSTEM = /\[\s*system\b/i

function lintPromptLineCloser(runs: readonly string[]): readonly ProseLintViolation[] {
  const lastRun = runs.at(-1)
  if (lastRun === undefined) return []
  const line = lastLine(lastRun)
  if (line === "") return []
  if (isQuoted(line)) return []
  const wordCount = line.split(/\s+/).filter((w) => w !== "").length
  if (wordCount > MAX_CLOSER_WORDS) return []
  const hit = PROMPT_CLOSERS.some((re) => re.test(line))
  if (!hit) return []
  return [
    {
      lint: "pov-agency/prompt-line-closer",
      message:
        "prose ends on a second-person action prompt duplicating the action bar — " +
        "the GM narrates and stops; the UI already offers the player their move.",
    },
  ]
}

function lintInlineSystemText(runs: readonly string[]): readonly ProseLintViolation[] {
  const hit = runs.some((run) => INLINE_SYSTEM.test(run))
  if (!hit) return []
  return [
    {
      lint: "system-voice/inline-text",
      message:
        "prose carries an inline [System …] window — the System voice rides its own " +
        "cards behind {{system}} position markers, never inline in the GM narration.",
    },
  ]
}

export function lintGmVoiceProse(text: string): readonly ProseLintViolation[] {
  const runs = proseRuns(text)
  return [...lintPromptLineCloser(runs), ...lintInlineSystemText(runs)]
}

export class GmVoiceProseError extends Error {
  readonly violations: readonly ProseLintViolation[]
  constructor(violations: readonly ProseLintViolation[]) {
    const body = violations.map((v) => `  - ${v.lint}: ${v.message}`).join("\n")
    super(`turn prose has GM-voice intrusions:\n${body}`)
    this.name = "GmVoiceProseError"
    this.violations = violations
  }
}

export function assertGmVoiceProse(text: string): undefined {
  const violations = lintGmVoiceProse(text)
  if (violations.length > 0) throw new GmVoiceProseError(violations)
}
