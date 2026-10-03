import type { CharacterClass } from "akasha/story/world/mechanics/classes/character-class/character-class.page-type.types.ts"

export const theIdleEpochCallumLoopweaver = {
  id: "01a10332-4087-7d1c-a26b-d05e6c71889f",
  type: "page-type/character-class",
  slug: "the-idle-epoch-callum-loopweaver",
  title: "Loopweaver",
  world: "world/the-idle-epoch",
  description: "The only Loopweaver in the world, an automation class.",
  character: "character-player/the-idle-epoch-callum",
  class: "world-class/the-idle-epoch-loopweaver",
  unrevealed: false,
} as const satisfies CharacterClass
