const FALLBACK_NAME = "untitled"

const COLLISION_CEILING = 1000

export function slugifyName(name: string): string {
  const folded = name.normalize("NFD").replace(/\p{Diacritic}/gu, "")
  const slug = folded
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return slug === "" ? FALLBACK_NAME : slug
}

export function artistSlugOf(name: string): string {
  return slugifyName(name)
}

export function songSlugBase(artistSlug: string, title: string): string {
  return `${artistSlug}-${slugifyName(title)}`
}

export function mintSongSlug(
  artistSlug: string,
  title: string,
  taken: ReadonlySet<string>
): string {
  const base = songSlugBase(artistSlug, title)
  if (!taken.has(base)) return base
  for (let nth = 2; nth <= COLLISION_CEILING; nth += 1) {
    const candidate = `${base}-${nth}`
    if (!taken.has(candidate)) return candidate
  }
  throw new Error(
    `mintSongSlug(${artistSlug}, ${title}): ${COLLISION_CEILING} songs already stand under \`${base}\`, which is past anything a real catalogue holds.`
  )
}
