const COVER_URL_PREFIX = "/api/image/"

export function coverUrl(pageId: string): string {
  return `${COVER_URL_PREFIX}${pageId}`
}

export function parseCoverPageId(cover: string | null | undefined): string | null {
  if (cover == null || !cover.startsWith(COVER_URL_PREFIX)) return null
  const id = cover.slice(COVER_URL_PREFIX.length)
  return id.length > 0 ? id : null
}
