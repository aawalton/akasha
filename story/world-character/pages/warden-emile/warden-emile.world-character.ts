import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wardenEmile = {
  id: "01a0b70d-9987-7f42-8cd3-43e9b9e41b95",
  type: "page-type/world-character",
  slug: "warden-emile",
  title: "River Warden Emile",
  world: "world/the-wandering-inn",
  firstChapter: 440,
  lastChapter: 440,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
