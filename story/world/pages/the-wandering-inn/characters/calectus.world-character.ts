import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const calectus = {
  id: "01a0b707-8ce1-78b4-8c48-bf9972e30bb7",
  type: "page-type/world-character",
  slug: "calectus",
  title: "Calectus",
  world: "world/the-wandering-inn",
  firstChapter: 197,
  lastChapter: 618,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
