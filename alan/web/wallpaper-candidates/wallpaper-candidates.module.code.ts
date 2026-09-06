import { parseCoverPageId } from "@akasha/pages-url/cover-url"

export interface PersonaCoverRow {
  readonly id: string
  readonly slug?: string | null
  readonly lastMessagedAt?: string | null
  readonly cover?: string | null
  readonly mobileWallpaper?: string | null
}

interface Candidate {
  readonly id: string
  readonly named: string
  readonly stampMs: number
}

function stampMs(iso: string | null | undefined): number {
  if (iso == null) return Number.NEGATIVE_INFINITY
  const ms = Date.parse(iso)
  return Number.isNaN(ms) ? Number.NEGATIVE_INFINITY : ms
}

function ordered(candidates: Candidate[]): readonly string[] {
  candidates.sort((a, b) => {
    if (b.stampMs !== a.stampMs) return b.stampMs - a.stampMs
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
  })
  return candidates.map((one) => one.named)
}

export function orderedCoverCandidates(rows: readonly PersonaCoverRow[]): readonly string[] {
  const candidates: Candidate[] = []
  for (const row of rows) {
    const coverPageId = parseCoverPageId(row.cover)
    if (coverPageId === null) continue
    candidates.push({ id: row.id, named: coverPageId, stampMs: stampMs(row.lastMessagedAt) })
  }
  return ordered(candidates)
}

export function orderedWallpaperSlugs(rows: readonly PersonaCoverRow[]): readonly string[] {
  const candidates: Candidate[] = []
  for (const row of rows) {
    const slug = row.slug
    if (typeof slug !== "string" || slug === "") continue
    if (typeof row.mobileWallpaper !== "string" || row.mobileWallpaper === "") continue
    candidates.push({ id: row.id, named: slug, stampMs: stampMs(row.lastMessagedAt) })
  }
  return ordered(candidates)
}
