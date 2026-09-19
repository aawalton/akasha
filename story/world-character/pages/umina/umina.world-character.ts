import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const umina = {
  id: "01a0b70d-8159-7be7-90da-ef693759c3fb",
  type: "page-type/world-character",
  slug: "umina",
  title: "Umina",
  world: "world/the-wandering-inn",
  firstChapter: 111,
  lastChapter: 575,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
