import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sirRelz = {
  id: "01a0b70d-02b5-7f54-929a-b0336e44fb14",
  type: "page-type/world-character",
  slug: "sir-relz",
  title: "Sir Relz",
  world: "world/the-wandering-inn",
  firstChapter: 391,
  lastChapter: 792,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
