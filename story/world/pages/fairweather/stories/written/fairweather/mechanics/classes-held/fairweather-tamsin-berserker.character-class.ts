import type { CharacterClass } from "akasha/story/world/mechanics/classes/character-class/character-class.page-type.types.ts"

export const fairweatherTamsinBerserker = {
  id: "01a10364-ec0a-7fb9-9b21-b352ec9e9b9f",
  type: "page-type/character-class",
  slug: "fairweather-tamsin-berserker",
  title: "Berserker",
  world: "world/fairweather",
  description: "A fighting class whose strength comes from rage.",
  character: "character-other/fairweather-tamsin",
  class: "world-class/fairweather-berserker",
  unrevealed: true,
} as const satisfies CharacterClass
