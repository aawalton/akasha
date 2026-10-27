import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { worldCharacter } from "akasha/story/world/characters/world-character.page-type.ts"
import {
  type Admitted,
  admittedIndexed,
  type Character,
  castIndexed,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"

const CHARACTER = "character"

const HYPHEN = "-"

const SPACES = /\s+/g

const SHOWN = "character-player/<slug>"

function kebabOf(said: string): string {
  return said.trim().toLowerCase().replace(SPACES, HYPHEN)
}

function namedBy(said: string, one: Character): boolean {
  const named = kebabOf(slugOf(said))
  if (named === "") return false
  const slug = slugOf(one.address)
  const title = kebabOf(one.title)
  return (
    slug === named ||
    slug.endsWith(`${HYPHEN}${named}`) ||
    title === named ||
    title.split(HYPHEN)[0] === named
  )
}

export function meantBy(said: string, cast: readonly Character[]): readonly string[] {
  const meant = cast.filter((one) => namedBy(said, one)).map((one) => one.aliasOf ?? one.address)
  return [...new Set(meant)].sort()
}

type Filed = "character" | "page" | null

function filedAs(said: string, admitted: Admitted): Filed {
  const address = addressIn(said)
  if (address.kind !== "qualified" || !admitted.filed(said)) return null
  return admitted.types.includes(address.pageTypeSlug) ? "character" : "page"
}

function sayInstead(meant: readonly string[]): string {
  if (meant.length === 0) return `, and no character of this story is named so`
  if (meant.length === 1) return `; say \`${meant[0] ?? ""}\``
  return `; say one of ${meant.map((one) => `\`${one}\``).join(", ")}`
}

export type Casting = {
  readonly admitted: () => Admitted
  readonly cast: () => readonly Character[]
  readonly slugged: (slug: string) => readonly string[]
}

export function castingIndexed(root: string, story: string): Casting {
  const admitted = (): Admitted => admittedIndexed(root)
  return {
    admitted,
    cast: () => castIndexed(root, story),
    slugged: (slug) =>
      admitted().types.flatMap((type) =>
        listedAt(root, type, slug).length > 0 ? [`${type}/${slug}`] : []
      ),
  }
}

function meantFor(said: string, cast: readonly Character[], casting: Casting): readonly string[] {
  const meant = meantBy(said, cast)
  return meant.length > 0 ? meant : casting.slugged(kebabOf(slugOf(said)))
}

function aliasRefused(said: string, cast: readonly Character[]): string | null {
  const alias = cast.find((one) => one.address === said)?.aliasOf ?? null
  if (alias === null) return null
  return `\`${said}\` is an alias of \`${alias}\`, and \`${CHARACTER}\` names a character one way; say \`${alias}\``
}

function besideRefused(said: string, casting: Casting): string | null {
  const meant = casting.slugged(slugOf(said))
  if (meant.length === 0) return null
  return `\`${said}\` is a page beside a character rather than the character's own${sayInstead(meant)}`
}

export function characterRefused(reading: unknown, casting: Casting): string | null {
  if (!isRecord(reading) || !(CHARACTER in reading)) return null
  const said = reading[CHARACTER]
  if (typeof said !== "string") {
    return `\`${CHARACTER}\` names a page by its address, as \`${SHOWN}\`, and what was said is no text`
  }
  const filed = filedAs(said, casting.admitted())
  if (filed === "character") return aliasRefused(said, casting.cast())
  if (filed === "page") return besideRefused(said, casting)
  const why = `\`${said}\` names no page, and \`${CHARACTER}\` names one by its address, as \`${SHOWN}\` for a \`${worldCharacter.slug}\` or a type extending it`
  return `${why}${sayInstead(meantFor(said, casting.cast(), casting))}`
}
