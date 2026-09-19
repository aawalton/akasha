import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ladyMagnoliaReinhart = {
  id: "01a0b70b-7446-7890-aef0-efe61f5b52c3",
  type: "page-type/world-character",
  slug: "lady-magnolia-reinhart",
  title: "Magnolia Reinhart",
  world: "world/the-wandering-inn",
  firstChapter: 81,
  lastChapter: 140,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
