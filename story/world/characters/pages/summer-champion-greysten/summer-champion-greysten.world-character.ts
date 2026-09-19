import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const summerChampionGreysten = {
  id: "01a0b70d-1066-77bb-99eb-b22a08620cd5",
  type: "page-type/world-character",
  slug: "summer-champion-greysten",
  title: "Summer's Champion",
  world: "world/the-wandering-inn",
  firstChapter: 490,
  lastChapter: 490,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
