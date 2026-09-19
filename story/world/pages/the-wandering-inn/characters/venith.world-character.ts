import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const venith = {
  id: "01a0b70d-8e11-795f-baa9-fdd700cc4160",
  type: "page-type/world-character",
  slug: "venith",
  title: "Venith",
  world: "world/the-wandering-inn",
  firstChapter: 178,
  lastChapter: 182,
  characterClaims: "jsonl",
  aliasOf: "world-character/venith-crusland",
} as const satisfies WorldCharacter
