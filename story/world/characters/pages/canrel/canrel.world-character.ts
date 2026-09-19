import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const canrel = {
  id: "01a0b707-9158-7200-a25f-70ede443140c",
  type: "page-type/world-character",
  slug: "canrel",
  title: "Canrel",
  world: "world/the-wandering-inn",
  firstChapter: 440,
  lastChapter: 440,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
