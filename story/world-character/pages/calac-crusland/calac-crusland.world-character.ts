import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const calacCrusland = {
  id: "01a0b707-8cab-744b-b549-e449f59ceeb3",
  type: "page-type/world-character",
  slug: "calac-crusland",
  title: "Calac Crusland",
  world: "world/the-wandering-inn",
  firstChapter: 557,
  lastChapter: 559,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
