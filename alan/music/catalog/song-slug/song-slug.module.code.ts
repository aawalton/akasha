import { STEM_CEILING } from "@akasha/pages/naming/named-for/page-stem"

const FALLBACK_NAME = "untitled"

const COLLISION_CEILING = 1000

export type SongNames = {
  readonly taken: Set<string>
  readonly filed: Map<string, string>
}

export function slugifyName(name: string): string {
  const folded = name.normalize("NFD").replace(/\p{Diacritic}/gu, "")
  const slug = folded
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return slug === "" ? FALLBACK_NAME : slug
}

export function shortenedToWords(whole: string, ceiling: number): string {
  if (whole.length <= ceiling) return whole
  const words = whole.split("-")
  let out = words[0] ?? ""
  for (const word of words.slice(1)) {
    if (out.length + 1 + word.length > ceiling) break
    out = `${out}-${word}`
  }
  return out.length <= ceiling ? out : out.slice(0, ceiling).replace(/-+$/, "")
}

export function artistSlugOf(name: string): string {
  return shortenedToWords(slugifyName(name), STEM_CEILING)
}

export function songSlugBase(artistSlug: string, title: string): string {
  return shortenedToWords(`${artistSlug}-${slugifyName(title)}`, STEM_CEILING)
}

export function mintSongSlug(
  artistSlug: string,
  title: string,
  taken: ReadonlySet<string>
): string {
  const base = songSlugBase(artistSlug, title)
  if (!taken.has(base)) return base
  for (let nth = 2; nth <= COLLISION_CEILING; nth += 1) {
    const numbered = `-${nth}`
    const candidate = `${shortenedToWords(base, STEM_CEILING - numbered.length)}${numbered}`
    if (!taken.has(candidate)) return candidate
  }
  throw new Error(
    `mintSongSlug(${artistSlug}, ${title}): ${COLLISION_CEILING} songs are already filed under \`${base}\`, which is more than any real catalogue holds.`
  )
}

export function songNamesFrom(
  rows: Iterable<{ readonly slug: string; readonly externalId?: string | null }>
): SongNames {
  const taken = new Set<string>()
  const filed = new Map<string, string>()
  for (const row of rows) {
    if (row.slug === "") continue
    taken.add(row.slug)
    if (row.externalId != null && row.externalId !== "") filed.set(row.externalId, row.slug)
  }
  return { taken, filed }
}

export function songSlugFor(
  names: SongNames,
  artistSlug: string,
  title: string,
  externalId: string
): string {
  const held = names.filed.get(externalId)
  if (held !== undefined) return held
  const minted = mintSongSlug(artistSlug, title, names.taken)
  names.taken.add(minted)
  names.filed.set(externalId, minted)
  return minted
}
