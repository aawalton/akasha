import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zemine = {
  id: "01a0b70d-eb16-7ab8-b222-20777d65ea4d",
  type: "page-type/world-character",
  slug: "zemine",
  title: "Zemine",
  world: "world/the-wandering-inn",
  firstChapter: 720,
  lastChapter: 720,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
