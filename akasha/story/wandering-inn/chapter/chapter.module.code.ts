export const STORY_SLUG = "the-wandering-inn"
export const STORY_PAGE_TYPE = "story-read"
export const CHAPTER_PAGE_TYPE = "story-chapter-read"

const POSITION_DIGITS = 4

const TRAILING_NAV_RE = /\n[^\S\n]*(?:Previous Chapter(?:\s*Next Chapter)?|Next Chapter)\s*$/
const DATED_URL_RE = /\/(\d{4})\/(\d{2})\/(\d{2})\//
const SITE_SUFFIX_RE = /\s*-\s*The Wandering Inn\s*$/
const PATRON_TITLE_PREFIX = "Patron Early Access"

export function strippedOfTrailingNav(text: string): string {
  if (!TRAILING_NAV_RE.test(text)) return text
  return text.replace(TRAILING_NAV_RE, "").trimEnd()
}

export function publishedDayOf(url: string): string | null {
  const dated = DATED_URL_RE.exec(url)
  if (dated === null) return null
  const [, year, month, day] = dated
  const stated = `${year}-${month}-${day}`
  const instant = new Date(stated)
  if (Number.isNaN(instant.getTime())) return null
  if (instant.toISOString().slice(0, 10) !== stated) return null
  return stated
}

export function chapterSlugOf(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "untitled"
  )
}

export function chapterPageSlug(position: number, slug: string): string {
  const at = String(position).padStart(POSITION_DIGITS, "0")
  return `${STORY_SLUG}-${at}-${slug}`
}

export function isPatronTitle(title: string): boolean {
  return title.startsWith(PATRON_TITLE_PREFIX)
}

export function chapterTitleOf(ogTitle: string, docTitle: string, listedTitle: string): string {
  if (ogTitle !== "") return ogTitle
  const stripped = docTitle.replace(SITE_SUFFIX_RE, "").trim()
  if (stripped !== "") return stripped
  return listedTitle
}
