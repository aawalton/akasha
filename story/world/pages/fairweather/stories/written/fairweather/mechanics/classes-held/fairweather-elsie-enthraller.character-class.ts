import type { CharacterClass } from "akasha/story/world/mechanics/classes/character-class/character-class.page-type.types.ts"

export const fairweatherElsieEnthraller = {
  id: "01a102af-305c-7885-b97a-56082fe2b625",
  type: "page-type/character-class",
  slug: "fairweather-elsie-enthraller",
  title: "Enthraller",
  world: "world/fairweather",
  description: "A class that draws its power from bonds, from what people feel toward the caster.",
  character: "character-player/fairweather-elsie",
  class: "world-class/fairweather-enthraller",
  unrevealed: false,
} as const satisfies CharacterClass
