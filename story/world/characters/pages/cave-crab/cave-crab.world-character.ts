import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const caveCrab = {
  id: "01a0b705-e6fb-74f4-b562-2d8b0b4a3dd1",
  type: "page-type/world-character",
  slug: "cave-crab",
  title: "large crustacean monster",
  world: "world/the-wandering-inn",
  firstChapter: 2,
  lastChapter: 2,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
