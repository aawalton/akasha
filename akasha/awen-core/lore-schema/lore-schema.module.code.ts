import { z } from "zod"

export const LORE_KINDS = ["entity", "timeline", "thread", "quote"] as const
export type LoreKind = (typeof LORE_KINDS)[number]

export function isLoreKind(s: string): s is LoreKind {
  return LORE_KINDS.some((k) => k === s)
}

export const LORE_THREAD_STATUSES = ["open", "closed"] as const
export type LoreThreadStatus = (typeof LORE_THREAD_STATUSES)[number]

export const LoreCitationSchema = z
  .object({
    turnExternalId: z.string().min(1),
    quote: z.string().min(1),
  })
  .strict()
export type LoreCitation = z.infer<typeof LoreCitationSchema>

export const LoreContentSchema = z.discriminatedUnion("kind", [
  z
    .object({
      kind: z.literal("entity"),
      attribute: z.string().min(1),
      value: z.string().min(1),
    })
    .strict(),
  z
    .object({
      kind: z.literal("timeline"),
      ordinal: z.number(),
      event: z.string().min(1),
    })
    .strict(),
  z
    .object({
      kind: z.literal("thread"),
      status: z.enum(LORE_THREAD_STATUSES),
      summary: z.string().min(1),
    })
    .strict(),
  z
    .object({
      kind: z.literal("quote"),
      speaker: z.string().min(1).optional(),
      line: z.string().min(1),
    })
    .strict(),
])
export type LoreContent = z.infer<typeof LoreContentSchema>

export const LoreEntryInputSchema = z
  .object({
    externalId: z.string().min(1),
    subjectKey: z.string().min(1),
    sourceTurn: z.string().min(1),
    citation: LoreCitationSchema,
    content: LoreContentSchema,
    supersedes: z.string().min(1).optional(),
  })
  .strip()
export type LoreEntryInput = z.infer<typeof LoreEntryInputSchema>

export function loreKindOf(content: LoreContent): LoreKind {
  return content.kind
}

export interface CitationIntegrityResult {
  readonly ok: boolean
  readonly reason?: string
}

function normalizeForMatch(s: string): string {
  return s.replace(/\s+/g, " ").trim()
}

export function decideCitationIntegrity(
  quote: string,
  turnText: string | undefined
): CitationIntegrityResult {
  if (turnText === undefined || turnText.length === 0) {
    return { ok: false, reason: "cited turn has no published text" }
  }
  const haystack = normalizeForMatch(turnText)
  const needle = normalizeForMatch(quote)
  if (needle.length === 0) return { ok: false, reason: "citation quote is empty" }
  return haystack.includes(needle)
    ? { ok: true }
    : { ok: false, reason: "citation quote not found verbatim in cited turn text" }
}

export interface LoreIngestCandidate {
  readonly externalId: string
  readonly updatedAt: string
  readonly loreIngestedAt?: string | undefined
}

export function decideLoreIngestPending(turns: readonly LoreIngestCandidate[]): readonly string[] {
  return turns
    .filter((turn) => {
      if (turn.loreIngestedAt === undefined || turn.loreIngestedAt.length === 0) return true
      const ingested = Date.parse(turn.loreIngestedAt)
      const edited = Date.parse(turn.updatedAt)
      if (Number.isNaN(ingested) || Number.isNaN(edited)) return true
      return ingested < edited
    })
    .map((turn) => turn.externalId)
}
