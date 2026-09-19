import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladyCecille = {
  id: "01a0b70b-72c0-7fb9-997d-2e618468bc4b",
  type: "page-type/world-character",
  slug: "lady-cecille",
  title: "Lady Cecille",
  world: "world/the-wandering-inn",
  firstChapter: 778,
  lastChapter: 778,
  characterClaims: "jsonl",
  aliasOf: "world-character/lady-cecille-reinhart",
} as const satisfies WorldCharacter
