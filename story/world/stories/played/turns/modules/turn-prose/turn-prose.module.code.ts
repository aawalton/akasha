import { wordCount } from "akasha/story/engine/core/modules/word-count/word-count.module.code.ts"
import {
  type Admitted,
  type Character,
  listedRefused,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"

const PROSE_HELD = "txt"

const PARTED = "/"

const BREAK = "\n"

export type ProseTaken =
  | { readonly values: Readonly<Record<string, unknown>>; readonly prose: string }
  | { readonly refused: string }

export function unaddressed(what: string, addresses: readonly string[]): string | null {
  const bare = addresses.find((one) => !one.includes(PARTED))
  if (bare === undefined) return null
  return `a ${what} is named by its address, its type and its slug, and \`${bare}\` names no type`
}

function castRefused(
  prose: string,
  characters: readonly string[],
  cast: readonly Character[],
  admitted: Admitted
): string | null {
  return unaddressed("character", characters) ?? listedRefused(prose, characters, cast, admitted)
}

export function proseTaken(
  prose: string,
  characters: readonly string[],
  cast: readonly Character[],
  admitted: Admitted
): ProseTaken {
  if (prose.trim() === "") {
    return { refused: "a writer's advance hands in prose, and this has none" }
  }
  const wrong = castRefused(prose, characters, cast, admitted)
  if (wrong !== null) return { refused: wrong }
  const kept = [...new Set(characters)]
  return {
    prose: prose.endsWith(BREAK) ? prose : `${prose}${BREAK}`,
    values: {
      prose: PROSE_HELD,
      ownLength: wordCount(prose),
      ...(kept.length === 0 ? {} : { characters: kept }),
    },
  }
}
