import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const regis = {
  id: "01a0b70c-8b08-713e-9587-7c46f86ef415",
  type: "page-type/world-character",
  slug: "regis",
  title: "Regis Reinhart",
  world: "world/the-wandering-inn",
  firstChapter: 819,
  lastChapter: 819,
  characterClaims: "jsonl",
  aliasOf: "world-character/regis-reinhart",
} as const satisfies WorldCharacter
