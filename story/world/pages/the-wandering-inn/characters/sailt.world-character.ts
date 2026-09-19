import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sailt = {
  id: "01a0b70c-a7c3-721c-92fb-574c32cd3cdf",
  type: "page-type/world-character",
  slug: "sailt",
  title: "Sailt",
  world: "world/the-wandering-inn",
  firstChapter: 400,
  lastChapter: 400,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
