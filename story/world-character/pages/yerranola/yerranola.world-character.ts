import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const yerranola = {
  id: "01a0b70d-dc73-7b53-98ad-ccc3f187c92c",
  type: "page-type/world-character",
  slug: "yerranola",
  title: "Yerranola",
  world: "world/the-wandering-inn",
  firstChapter: 207,
  lastChapter: 543,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
