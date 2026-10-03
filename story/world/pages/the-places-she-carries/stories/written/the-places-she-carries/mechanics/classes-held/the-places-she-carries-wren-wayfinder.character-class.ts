import type { CharacterClass } from "akasha/story/world/mechanics/classes/character-class/character-class.page-type.types.ts"

export const thePlacesSheCarriesWrenWayfinder = {
  id: "01a10337-ad0a-77a0-bfb8-c6d1dfd840c7",
  type: "page-type/character-class",
  slug: "the-places-she-carries-wren-wayfinder",
  title: "Wayfinder",
  world: "world/the-places-she-carries",
  description: "Wren's class, manifested at her Naming Day at sixteen.",
  character: "character-player/the-places-she-carries-wren",
  class: "world-class/the-places-she-carries-wayfinder",
  unrevealed: false,
} as const satisfies CharacterClass
