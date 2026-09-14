const COVER_URL_PREFIX = "/api/image/"

export function coverUrl(pageId: string): string {
  return `${COVER_URL_PREFIX}${pageId}`
}
