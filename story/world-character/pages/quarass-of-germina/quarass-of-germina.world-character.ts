import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const quarassOfGermina = {
  id: "01a0b70c-7996-7086-8581-d147c534cbaa",
  type: "page-type/world-character",
  slug: "quarass-of-germina",
  title: "the Quarass",
  world: "world/the-wandering-inn",
  firstChapter: 369,
  lastChapter: 589,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
