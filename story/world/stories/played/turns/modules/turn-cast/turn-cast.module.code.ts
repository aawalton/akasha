import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import {
  listedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  slugOf,
  slugsIn,
  textAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { characterOther } from "akasha/story/world/characters/character-other/character-other.page-type.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { characterStory } from "akasha/story/world/characters/properties/character-story.relation-property.ts"
import { worldCharacter } from "akasha/story/world/characters/world-character.page-type.ts"

const TYPES: readonly string[] = [characterPlayer.slug, characterOther.slug]

const PAGE_TYPE = "page-type"

const EXTENDS = "extends"

const SLUG = "slug"

const TITLE = "title"

const ALIAS_OF = "aliasOf"

const PROSE = "prose"

const CHARACTERS = "characters"

const PARTED = "/"

const SPACES = /\s+/

const OPENS_CAPITAL = /^\p{Lu}/u

const SPECIAL = /[.*+?^${}()|[\]\\]/g

export type Character = {
  readonly address: string
  readonly title: string
  readonly aliasOf: string | null
}

export function castIndexed(root: string, story: string): readonly Character[] {
  return TYPES.flatMap((type) =>
    valuesOfType(root, type).flatMap((one): readonly Character[] => {
      const of = textAt(one.value, characterStory.propertySlug)
      const slug = textAt(one.value, SLUG)
      const title = textAt(one.value, TITLE)
      if (of === null || slugOf(of) !== story || slug === null || title === null) return []
      return [{ address: `${type}${PARTED}${slug}`, title, aliasOf: textAt(one.value, ALIAS_OF) }]
    })
  )
}

export type Admitted = {
  readonly types: readonly string[]
  readonly filed: (address: string) => boolean
}

export function typeOf(address: string): string {
  return address.slice(0, address.indexOf(PARTED))
}

export function typesUnder(root: string, top: string): readonly string[] {
  const above = new Map<string, readonly string[]>()
  for (const one of valuesOfType(root, PAGE_TYPE)) {
    const slug = textAt(one.value, SLUG)
    if (slug !== null) above.set(slug, slugsIn(one.value[EXTENDS]))
  }
  const reaches = (slug: string, walked: Set<string>): boolean => {
    if (slug === top) return true
    if (walked.has(slug)) return false
    walked.add(slug)
    return (above.get(slug) ?? []).some((one) => reaches(one, walked))
  }
  return [...above.keys()].filter((one) => reaches(one, new Set<string>())).sort()
}

export function admittedIndexed(root: string): Admitted {
  return {
    types: typesUnder(root, worldCharacter.slug),
    filed: (address) => listedAt(root, typeOf(address), slugOf(address)).length > 0,
  }
}

function admittedIn(address: string, admitted: Admitted): boolean {
  return admitted.types.includes(typeOf(address)) && admitted.filed(address)
}

function wholeWordIn(text: string, word: string): boolean {
  const escaped = word.replace(SPECIAL, "\\$&")
  return new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, "u").test(text)
}

function namesOf(title: string): readonly string[] {
  const words = title.trim().split(SPACES)
  const first = words[0] ?? ""
  return words.length > 1 ? [words.join(" "), first] : [first]
}

function namedIn(prose: string, name: string): boolean {
  if (!OPENS_CAPITAL.test(name)) return false
  if (wholeWordIn(prose, name.toLowerCase())) return false
  return wholeWordIn(prose, name)
}

function ownerOf(character: Character): string {
  return character.aliasOf ?? character.address
}

export function unlistedIn(
  prose: string,
  listed: readonly string[],
  cast: readonly Character[]
): readonly string[] {
  const slugs = new Set(listed.map(slugOf))
  const covered = new Set(
    cast.filter((one) => slugs.has(slugOf(one.address))).map((one) => slugOf(ownerOf(one)))
  )
  const named = cast
    .filter((one) => namesOf(one.title).some((name) => namedIn(prose, name)))
    .map(ownerOf)
  return [...new Set(named)].filter((one) => !slugs.has(slugOf(one)) && !covered.has(slugOf(one)))
}

type Casting = {
  readonly at: string
  readonly value: Readonly<Record<string, unknown>>
}

function proseOf(at: string, textOf: (path: string) => string): string | null {
  try {
    return textOf(at)
  } catch {
    return null
  }
}

export function castKept(
  turn: Casting,
  cast: readonly Character[],
  textOf: (path: string) => string,
  admitted: Admitted
): Readonly<Record<string, unknown>> {
  const ending = turn.value[PROSE]
  const at = typeof ending === "string" ? besideAt(turn.at, PROSE, ending) : null
  const prose = at === null || cast.length === 0 ? null : proseOf(at, textOf)
  if (prose === null) return {}
  const listed = stringsIn(turn.value[CHARACTERS])
  const added = unlistedIn(prose, listed, cast).filter((one) => admittedIn(one, admitted))
  return added.length === 0 ? {} : { [CHARACTERS]: [...listed, ...added] }
}

export function listedRefused(
  prose: string,
  listed: readonly string[],
  cast: readonly Character[],
  admitted: Admitted
): string | null {
  const other = listed.find((one) => !admitted.types.includes(typeOf(one)))
  if (other !== undefined) {
    return `\`${other}\` names a \`${typeOf(other)}\`, and a character is a \`${worldCharacter.slug}\` or of a type extending it; a lore page describing someone is no character`
  }
  return unfiledRefused(listed, admitted, "character") ?? unlistedRefused(prose, listed, cast)
}

export function unfiledRefused(
  addresses: readonly string[],
  admitted: Admitted,
  what: string
): string | null {
  const absent = addresses.find((one) => !admitted.filed(one))
  if (absent === undefined) return null
  return `\`${absent}\` names no page, and a ${what} handed in is a page filed`
}

export function unlistedRefused(
  prose: string,
  listed: readonly string[],
  cast: readonly Character[]
): string | null {
  const missing = unlistedIn(prose, listed, cast)
  if (missing.length === 0) return null
  const named = missing.map((one) => `\`${one}\``).join(", ")
  const those = missing.length === 1 ? "that character" : "those characters"
  return `the prose names ${named}, and \`--character\` does not list ${those}; list every character the prose names`
}
