import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const witchMavika = {
  id: "01a0b70d-9fc1-70aa-8b42-36b60d9b80b5",
  type: "page-type/world-character",
  slug: "witch-mavika",
  title: "Mavika",
  world: "world/the-wandering-inn",
  firstChapter: 714,
  lastChapter: 714,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
