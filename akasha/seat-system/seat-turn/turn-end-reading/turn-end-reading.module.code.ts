import { type LogicalModel, toWireId } from "@akasha/agents/model-vocab"
import { conductIn } from "../turn-end-conduct/turn-end-conduct.module.code.ts"
import {
  evidenceFrom,
  readTail,
  type TurnEvidence,
} from "../turn-end-evidence/turn-end-evidence.module.code.ts"
import {
  buildReadingInstructions,
  buildReadingUser,
  extractStreamText,
  parseAnswer,
  READER_IDENTITY,
  type ReaderAnswer,
} from "../turn-end-prompt/turn-end-prompt.module.code.ts"

export const DEFAULT_READING_MODEL: LogicalModel = "sonnet"

export const DEFAULT_TIMEOUT_MS = 15_000

export const REFUSABLE_EXIT = 3

const MAX_TOKENS = 1_000

export const READING_VERDICTS = ["allow", "refuse"] as const

export type ReadingVerdict = (typeof READING_VERDICTS)[number]

export type UnestablishedBasis = "no-final-text" | "unanswered"

export type ReadingAnswer =
  | {
      readonly kind: "read"
      readonly verdict: ReadingVerdict
      readonly why: string
      readonly line: string
    }
  | { readonly kind: "unestablished"; readonly basis: UnestablishedBasis }

export interface Reading {
  readonly answer: ReadingAnswer
  readonly evidence: TurnEvidence | null
  readonly label: string
  readonly why: string
  readonly line: string
}

export const UNESTABLISHED_LABEL = "allow:unestablished-"

export function quotesConduct(line: string, conduct: string): boolean {
  const said = line.trim()
  if (said === "") return false
  return conduct.includes(said)
}

export function classifyAnswer(said: ReaderAnswer | null, conduct: string): ReadingAnswer {
  if (said === null) return { kind: "unestablished", basis: "unanswered" }
  const asked = said.verdict.toLowerCase()
  const matched = READING_VERDICTS.find((one) => one === asked)
  if (matched === undefined) return { kind: "unestablished", basis: "unanswered" }
  if (matched === "refuse" && !quotesConduct(said.line, conduct))
    return { kind: "read", verdict: "allow", why: "", line: "" }
  return { kind: "read", verdict: matched, why: said.why, line: said.line.trim() }
}

export function labelOf(answer: ReadingAnswer): string {
  return answer.kind === "read" ? answer.verdict : `${UNESTABLISHED_LABEL}${answer.basis}`
}

export function labelSettled(label: string): boolean {
  return !label.startsWith(UNESTABLISHED_LABEL)
}

export function whyOf(answer: ReadingAnswer): string {
  return answer.kind === "read" ? answer.why : ""
}

export function lineOf(answer: ReadingAnswer): string {
  return answer.kind === "read" ? answer.line : ""
}

export function exitCodeFor(answer: ReadingAnswer): number {
  return answer.kind === "read" && answer.verdict === "refuse" ? REFUSABLE_EXIT : 0
}

export function readingEndpoint(): string {
  const baseUrl = process.env.ANTHROPIC_BASE_URL
  if (baseUrl === undefined || baseUrl === "")
    throw new Error(
      "turn-end-reading: ANTHROPIC_BASE_URL names no OAuth proxy, so no turn end can be read. " +
        "Every turn end would come back unsettled, which is a reading of this command rather than " +
        "of the seat."
    )
  return baseUrl
}

async function askReader(args: {
  readonly model: LogicalModel
  readonly instructions: string
  readonly userText: string
  readonly timeoutMs: number
}): Promise<ReaderAnswer | null> {
  try {
    const res = await fetch(new URL("/v1/messages", readingEndpoint()), {
      method: "POST",
      headers: { "content-type": "application/json", "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: toWireId(args.model),
        max_tokens: MAX_TOKENS,
        stream: true,
        system: [
          { type: "text", text: READER_IDENTITY },
          { type: "text", text: args.instructions },
        ],
        messages: [{ role: "user", content: args.userText }],
      }),
      signal: AbortSignal.timeout(args.timeoutMs),
    })
    if (!res.ok) return null
    const text = extractStreamText(await res.text())
    return text === null ? null : parseAnswer(text)
  } catch {
    return null
  }
}

function settledBy(answer: ReadingAnswer, evidence: TurnEvidence | null): Reading {
  return { answer, evidence, label: labelOf(answer), why: whyOf(answer), line: lineOf(answer) }
}

export async function readingOn(args: {
  readonly conduct: string
  readonly evidence: TurnEvidence
  readonly model: LogicalModel
  readonly timeoutMs: number
}): Promise<Reading> {
  const said = await askReader({
    model: args.model,
    instructions: buildReadingInstructions(args.conduct),
    userText: buildReadingUser(args.evidence),
    timeoutMs: args.timeoutMs,
  })
  return settledBy(classifyAnswer(said, args.conduct), args.evidence)
}

export async function readingFor(args: {
  readonly root: string
  readonly transcript: string
  readonly model: LogicalModel
  readonly timeoutMs: number
  readonly pending: boolean
}): Promise<Reading> {
  const conduct = conductIn(args.root)
  const read = evidenceFrom(await readTail(args.transcript))
  if (read === null) return settledBy({ kind: "unestablished", basis: "no-final-text" }, null)

  return readingOn({
    conduct,
    evidence: { ...read, pending: args.pending },
    model: args.model,
    timeoutMs: args.timeoutMs,
  })
}
