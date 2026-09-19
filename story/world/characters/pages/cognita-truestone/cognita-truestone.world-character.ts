import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cognitaTruestone = {
  id: "01a0b70a-0437-7a6e-a098-797a8d3aa56d",
  type: "page-type/world-character",
  slug: "cognita-truestone",
  title: "Cognita Truestone",
  world: "world/the-wandering-inn",
  firstChapter: 652,
  lastChapter: 797,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
