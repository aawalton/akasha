import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const vorsFissival = {
  id: "01a0b70d-977d-7c49-bc72-25c1d151c25e",
  type: "page-type/world-character",
  slug: "vors-fissival",
  title: "Vors",
  world: "world/the-wandering-inn",
  firstChapter: 519,
  lastChapter: 519,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
