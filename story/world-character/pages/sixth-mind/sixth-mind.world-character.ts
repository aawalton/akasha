import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sixthMind = {
  id: "01a0b70d-0403-76fa-9f00-a146d9f41e42",
  type: "page-type/world-character",
  slug: "sixth-mind",
  title: "Sixth Mind",
  world: "world/the-wandering-inn",
  firstChapter: 617,
  lastChapter: 617,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
