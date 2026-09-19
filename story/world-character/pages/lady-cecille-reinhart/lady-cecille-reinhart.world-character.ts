import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ladyCecilleReinhart = {
  id: "01a0b70b-72f8-7917-9e6e-75e545b254b0",
  type: "page-type/world-character",
  slug: "lady-cecille-reinhart",
  title: "Aunt Cecille",
  world: "world/the-wandering-inn",
  firstChapter: 208,
  lastChapter: 779,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
