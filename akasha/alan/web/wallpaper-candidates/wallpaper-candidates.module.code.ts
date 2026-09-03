import { parseCoverPageId } from "@akasha/pages-url/cover-url"

export interface PersonaCoverRow {
  readonly id: string
  readonly lastMessagedAt?: string | null
  readonly cover?: string | null
}

interface Candidate {
  readonly id: string
  readonly coverPageId: string
  readonly stampMs: number
}

function stampMs(iso: string | null | undefined): number {
  if (iso == null) return Number.NEGATIVE_INFINITY
  const ms = Date.parse(iso)
  return Number.isNaN(ms) ? Number.NEGATIVE_INFINITY : ms
}

export function orderedCoverCandidates(rows: readonly PersonaCoverRow[]): readonly string[] {
  const candidates: Candidate[] = []
  for (const row of rows) {
    const coverPageId = parseCoverPageId(row.cover)
    if (coverPageId === null) continue
    candidates.push({ id: row.id, coverPageId, stampMs: stampMs(row.lastMessagedAt) })
  }
  candidates.sort((a, b) => {
    if (b.stampMs !== a.stampMs) return b.stampMs - a.stampMs
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
  })
  return candidates.map((c) => c.coverPageId)
}
