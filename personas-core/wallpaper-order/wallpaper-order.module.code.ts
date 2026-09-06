// ONE AUTHORITY FOR THE ORDER. The route answering Alan's phone and the service setting Alan's
// desktop wallpaper have to land on the same persona, so the rule sits here and both callers read
// the rule from here rather than each caller keeping a copy of the rule.

export type WallpaperRow = {
  readonly id: string
  readonly slug?: string | null
  readonly lastMessagedAt?: string | null
  readonly wallpaper?: string | null
}

type Candidate = {
  readonly id: string
  readonly slug: string
  readonly stampMs: number
}

// A STAMP NOTHING CAN READ IS NOT THE NEWEST STAMP. Reading an absent or broken stamp as the
// present moment would put a persona nobody wrote to in front of the persona Alan just wrote to.
export function stampMsOf(iso: string | null | undefined): number {
  if (iso == null) return Number.NEGATIVE_INFINITY
  const ms = Date.parse(iso)
  return Number.isNaN(ms) ? Number.NEGATIVE_INFINITY : ms
}

export function orderedWallpaperSlugs(rows: readonly WallpaperRow[]): readonly string[] {
  const candidates: Candidate[] = []
  for (const row of rows) {
    const slug = row.slug
    if (typeof slug !== "string" || slug === "") continue
    if (typeof row.wallpaper !== "string" || row.wallpaper === "") continue
    candidates.push({ id: row.id, slug, stampMs: stampMsOf(row.lastMessagedAt) })
  }
  candidates.sort((a, b) => {
    if (b.stampMs !== a.stampMs) return b.stampMs - a.stampMs
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
  })
  return candidates.map((candidate) => candidate.slug)
}
