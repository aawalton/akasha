import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const arnel = {
  id: "01a0b707-723a-78fb-be0b-70e669ef218c",
  type: "page-type/world-character",
  slug: "arnel",
  title: "Arnel",
  world: "world/the-wandering-inn",
  firstChapter: 47,
  lastChapter: 47,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
