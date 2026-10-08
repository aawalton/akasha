import type { CharacterClass } from "akasha/story/world/mechanics/classes/character-class/character-class.page-type.types.ts"

export const fairweatherTillyAlchemist = {
  id: "01a10364-ec0b-7dde-84b0-9869e7693247",
  type: "page-type/character-class",
  slug: "fairweather-tilly-alchemist",
  title: "Alchemist",
  world: "world/fairweather",
  description:
    "A class that brews potions, salves and powders by pouring power into what it mixes.",
  character: "character-other/fairweather-tilly",
  class: "world-class/fairweather-alchemist",
  unrevealed: true,
  createdAt: "2026-10-03T20:11:48.107Z",
  updatedAt: "2026-10-03T21:05:51.000Z",
} as const satisfies CharacterClass
