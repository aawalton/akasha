import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const minotaurEmissary = {
  id: "01a06580-2495-7f9e-b299-d35f46bab375",
  type: "page-type/world-character",
  slug: "minotaur-emissary",
  title: "the Minotaur",
  world: "world/the-wandering-inn",
  maxLevel: 37,
  eventCount: 2,
  firstChapter: 183,
  lastChapter: 183,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
