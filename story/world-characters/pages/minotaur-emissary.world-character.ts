import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const minotaurEmissary = {
  id: "01a06580-2495-7f9e-b299-d35f46bab375",
  type: "world-character",
  slug: "minotaur-emissary",
  title: "the Minotaur",
  world: "the-wandering-inn",
  maxLevel: 37,
  eventCount: 2,
  firstChapter: 506,
  lastChapter: 506,
} as const satisfies WorldCharacter
