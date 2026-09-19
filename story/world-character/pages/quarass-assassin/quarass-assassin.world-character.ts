import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const quarassAssassin = {
  id: "01a0b70c-7926-7025-b6d8-0a7443cf7209",
  type: "page-type/world-character",
  slug: "quarass-assassin",
  title: "the creature in the alley",
  world: "world/the-wandering-inn",
  firstChapter: 808,
  lastChapter: 808,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
