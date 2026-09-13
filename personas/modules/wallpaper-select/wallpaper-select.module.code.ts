export interface WallpaperCandidate {
  readonly slug: string
  readonly level: number
  readonly path: string
}

export interface WallpaperFilter {
  readonly agent?: string
  readonly level?: number
}

export function selectWallpaper(
  candidates: readonly WallpaperCandidate[],
  filter: WallpaperFilter,
  pickIndex: (n: number) => number
): WallpaperCandidate | null {
  const agent = filter.agent?.toLowerCase()
  const matched = candidates.filter(
    (c) =>
      (filter.level === undefined || c.level === filter.level) &&
      (agent === undefined || c.slug.toLowerCase() === agent)
  )
  if (matched.length === 0) return null

  const bySlug = new Map<string, WallpaperCandidate[]>()
  for (const c of matched) {
    const group = bySlug.get(c.slug)
    if (group === undefined) bySlug.set(c.slug, [c])
    else group.push(c)
  }

  const slugs = [...bySlug.keys()].sort()
  const slug = slugs[pickIndex(slugs.length)]
  if (slug === undefined) return null
  const group = bySlug.get(slug)
  if (group === undefined || group.length === 0) return null
  return group[pickIndex(group.length)] ?? null
}

export function selectFollowWallpaper(
  candidates: readonly WallpaperCandidate[],
  currentLevel: number
): WallpaperCandidate | null {
  let best: WallpaperCandidate | null = null
  for (const c of candidates) {
    if (c.level > currentLevel) continue
    if (best === null || c.level > best.level || (c.level === best.level && c.path > best.path)) {
      best = c
    }
  }
  return best
}
