import { patchUncommittedUnder, readUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { agentPageFor, replacedAt } from "../read-log.ts"

type Notices = Record<string, number>

export const WORDS_TOLD = "words-told"

function noticesAt(page: string): Notices {
  const held = readUncommitted(page)?.[WORDS_TOLD]
  if (held === null || typeof held !== "object" || Array.isArray(held)) return {}
  const out: Notices = {}
  for (const [slug, at] of Object.entries(held as Record<string, unknown>)) {
    if (typeof at === "number" && Number.isFinite(at)) out[slug] = at
  }
  return out
}

export function toldOf(writer: string): ReadonlySet<string> {
  const page = agentPageFor(writer)
  if (page === null) return new Set<string>()
  const cutoff = replacedAt(page)
  const kept = new Set<string>()
  for (const [slug, at] of Object.entries(noticesAt(page))) if (at >= cutoff) kept.add(slug)
  return kept
}

export function recordTold(writer: string, slugs: readonly string[], at: number = Date.now()): void {
  if (slugs.length === 0) return
  const page = agentPageFor(writer)
  if (page === null) return
  const values: Record<string, unknown> = {}
  for (const slug of slugs) values[slug] = at
  try {
    patchUncommittedUnder(page, WORDS_TOLD, values)
  } catch {
    return
  }
}
