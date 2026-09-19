import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const calidus = {
  id: "01a0b707-8de8-7feb-b288-c8c1f9a0adcb",
  type: "page-type/world-character",
  slug: "calidus",
  title: "Calidus Reinhart",
  world: "world/the-wandering-inn",
  firstChapter: 819,
  lastChapter: 819,
  characterClaims: "jsonl",
  aliasOf: "world-character/calidus-reinhart",
} as const satisfies WorldCharacter
