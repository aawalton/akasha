const TEMPER_SLUG_PREFIX = "temper-"
const TEMPER_TITLE_PREFIX = "Temper "

export const TEMPER_UNPREFIXED_SLUGS: ReadonlySet<string> = new Set([
  "character-build",
  "companion-build",
])

function isTemperDomainSlug(slug: string): boolean {
  return slug.startsWith(TEMPER_SLUG_PREFIX) || TEMPER_UNPREFIXED_SLUGS.has(slug)
}

export function validateTemperTitlePrefix(slug: unknown, title: unknown): undefined {
  if (typeof slug !== "string" || typeof title !== "string") return
  if (!isTemperDomainSlug(slug)) return
  if (!title.startsWith(TEMPER_TITLE_PREFIX)) {
    throw new Error(
      `page type '${slug}' is Temper-domain but its title '${title}' is missing the required 'Temper ' prefix`
    )
  }
}
