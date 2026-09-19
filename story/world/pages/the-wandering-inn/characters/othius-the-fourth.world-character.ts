import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const othiusTheFourth = {
  id: "01a0b70c-1f65-72a4-b14e-82d2cdcf254d",
  type: "page-type/world-character",
  slug: "othius-the-fourth",
  title: "Othius",
  world: "world/the-wandering-inn",
  firstChapter: 482,
  lastChapter: 482,
  characterClaims: "jsonl",
  aliasOf: "world-character/othius-iv",
} as const satisfies WorldCharacter
