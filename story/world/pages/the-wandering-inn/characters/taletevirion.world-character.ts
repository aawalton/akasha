import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const taletevirion = {
  id: "01a0b70d-1222-796e-a413-e2bb2be0736e",
  type: "page-type/world-character",
  slug: "taletevirion",
  title: "the Unicorn",
  world: "world/the-wandering-inn",
  firstChapter: 627,
  lastChapter: 753,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
