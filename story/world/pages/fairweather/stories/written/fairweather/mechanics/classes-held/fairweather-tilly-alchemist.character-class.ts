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
  unrevealed: false,
} as const satisfies CharacterClass
