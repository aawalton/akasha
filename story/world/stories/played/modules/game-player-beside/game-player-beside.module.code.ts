"use client"

import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { characterPlayer } from "akasha/story/character/player/character-player.page-type.ts"
import { storyGame } from "akasha/story/game/story-game.page-type.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"

const GAME_TYPE = storyGame.slug

const EXTERNAL_KEY = "externalId"

const PLAYER_KEY = "player"

const SLUG_KEY = "slug"

const STORY_KEY = "story"

export type Played = { readonly values: Record<string, unknown> }

export function playerIn(rows: readonly Played[]): string | null {
  for (const row of rows) {
    const named = row.values[PLAYER_KEY]
    if (typeof named === "string" && named !== "") return named
  }
  return null
}

export function characterIn(rows: readonly Played[]): string | null {
  for (const row of rows) {
    const slug = row.values[SLUG_KEY]
    if (typeof slug === "string" && slug !== "") return namedAs(characterPlayer.slug, slug, null)
  }
  return null
}

async function characterOf(story: unknown): Promise<string | null> {
  if (typeof story !== "string" || story === "") return null
  const asked = await askComposed({
    "page-type": characterPlayer.slug,
    where: { story: { is: namedAs(storyPlayed.slug, story, null) } },
    keys: [SLUG_KEY, STORY_KEY],
  })
  return asked.ok ? characterIn(asked.answer.rows) : null
}

export async function playerOf(game: string): Promise<string | null> {
  const asked = await askComposed({
    "page-type": GAME_TYPE,
    where: { externalId: { is: game } },
    keys: [EXTERNAL_KEY, SLUG_KEY, PLAYER_KEY],
  })
  if (!asked.ok) return null
  const character = await characterOf(asked.answer.rows[0]?.values[SLUG_KEY])
  return character ?? playerIn(asked.answer.rows)
}
