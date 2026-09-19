import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bevia = {
  id: "01a0b707-8367-78bc-89be-ac89be2b20f1",
  type: "page-type/world-character",
  slug: "bevia",
  title: "Lady Bevia",
  world: "world/the-wandering-inn",
  firstChapter: 262,
  lastChapter: 262,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
