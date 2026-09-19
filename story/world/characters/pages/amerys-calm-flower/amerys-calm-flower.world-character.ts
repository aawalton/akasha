import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const amerysCalmFlower = {
  id: "01a0b707-6d21-7fb9-9520-bac522c4cc9c",
  type: "page-type/world-character",
  slug: "amerys-calm-flower",
  title: "Amerys",
  world: "world/the-wandering-inn",
  firstChapter: 704,
  lastChapter: 704,
  characterClaims: "jsonl",
  aliasOf: "world-character/amerys",
} as const satisfies WorldCharacter
