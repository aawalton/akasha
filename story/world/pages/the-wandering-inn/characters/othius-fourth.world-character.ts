import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const othiusFourth = {
  id: "01a0b70c-1ef3-73d9-88aa-ef3854e9d8a9",
  type: "page-type/world-character",
  slug: "othius-fourth",
  title: "Othius the Fourth",
  world: "world/the-wandering-inn",
  firstChapter: 477,
  lastChapter: 477,
  characterClaims: "jsonl",
  aliasOf: "world-character/othius-iv",
} as const satisfies WorldCharacter
