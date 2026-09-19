import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const caleisBerkesson = {
  id: "01a0b707-8d4a-718b-9ec0-e6bd186d1986",
  type: "page-type/world-character",
  slug: "caleis-berkesson",
  title: "Caleis Berkesson",
  world: "world/the-wandering-inn",
  firstChapter: 623,
  lastChapter: 623,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
