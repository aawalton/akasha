import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const vrilla = {
  id: "01a0b70d-97f3-7d71-ad29-20a335117b39",
  type: "page-type/world-character",
  slug: "vrilla",
  title: "Vrilla",
  world: "world/the-wandering-inn",
  firstChapter: 736,
  lastChapter: 736,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
