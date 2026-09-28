import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { slugOf, textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { characterOther } from "akasha/story/world/characters/character-other/character-other.page-type.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { characterStory } from "akasha/story/world/characters/properties/character-story.relation-property.ts"

const TYPES = [characterPlayer.slug, characterOther.slug]

const SLUG = "slug"

const TITLE = "title"

const ALIAS_OF = "aliasOf"

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
