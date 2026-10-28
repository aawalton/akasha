import { valueByPath } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"

const ACTION = "action"

const CHARACTER = "character"

const PLAYED_BY = `${characterPlayer.slug}/`

type Acted = { readonly action: string } | Record<string, never>

export function actedAt(
  root: string,
  turn: string,
  reading: Readonly<Record<string, unknown>>
): Acted {
  const action = valueByPath(root, turn)?.[ACTION]
  return actedOn(reading, typeof action === "string" ? action : null)
}

export function actedOn(reading: Readonly<Record<string, unknown>>, action: string | null): Acted {
  const character = reading[CHARACTER]
  if (action === null || typeof character !== "string") return {}
  return character.startsWith(PLAYED_BY) ? { action } : {}
}
