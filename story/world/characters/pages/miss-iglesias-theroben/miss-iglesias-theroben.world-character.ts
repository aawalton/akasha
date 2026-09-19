import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const missIglesiasTheroben = {
  id: "01a0b70b-f051-70a0-96f8-e97c97185fc4",
  type: "page-type/world-character",
  slug: "miss-iglesias-theroben",
  title: "Miss Iglesias Theroben",
  world: "world/the-wandering-inn",
  firstChapter: 349,
  lastChapter: 349,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
