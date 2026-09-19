import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const aroniaLischelle = {
  id: "01a0b707-7270-71ba-9283-6dbbbdcbfd24",
  type: "page-type/world-character",
  slug: "aronia-lischelle",
  title: "Aronia Lischelle",
  world: "world/the-wandering-inn",
  firstChapter: 819,
  lastChapter: 819,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
