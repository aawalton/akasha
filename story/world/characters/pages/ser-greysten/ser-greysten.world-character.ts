import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const serGreysten = {
  id: "01a0b70c-f363-7631-aaba-e0d6371b1252",
  type: "page-type/world-character",
  slug: "ser-greysten",
  title: "Ser Greysten",
  world: "world/the-wandering-inn",
  firstChapter: 527,
  lastChapter: 527,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
