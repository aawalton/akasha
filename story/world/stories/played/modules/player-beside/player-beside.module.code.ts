"use client"

import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"

const EXTERNAL_KEY = "externalId"

const SLUG_KEY = "slug"

const STORY_KEY = "story"

type Played = { readonly values: Record<string, unknown> }

export function characterIn(rows: readonly Played[]): string | null {
  for (const row of rows) {
    const slug = row.values[SLUG_KEY]
    if (typeof slug === "string" && slug !== "") return namedAs(characterPlayer.slug, slug, null)
  }
  return null
}

export function playerIn(stories: readonly Played[], players: readonly Played[]): string | null {
  const slug = stories[0]?.values[SLUG_KEY]
  if (typeof slug !== "string" || slug === "") return null
  const story = namedAs(storyPlayed.slug, slug, null)
  return characterIn(players.filter((row) => row.values[STORY_KEY] === story))
}

export async function playerOf(game: string): Promise<string | null> {
  const [stories, players] = await Promise.all([
    askComposed({
      "page-type": storyPlayed.slug,
      where: { externalId: { is: game } },
      keys: [EXTERNAL_KEY, SLUG_KEY],
    }),
    askComposed({ "page-type": characterPlayer.slug, keys: [SLUG_KEY, STORY_KEY] }),
  ])
  if (!stories.ok || !players.ok) return null
  return playerIn(stories.answer.rows, players.answer.rows)
}
