import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const cecilleReinhart = {
  id: "01a0b709-f895-7629-ba8a-581a09756b9c",
  type: "page-type/world-character",
  slug: "cecille-reinhart",
  title: "Cecille Reinhart",
  world: "world/the-wandering-inn",
  firstChapter: 824,
  lastChapter: 824,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
