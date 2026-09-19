import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const vernoue = {
  id: "01a0b70d-8ef7-7192-a8f5-a03a38604579",
  type: "page-type/world-character",
  slug: "vernoue",
  title: "Vernoue",
  world: "world/the-wandering-inn",
  firstChapter: 608,
  lastChapter: 773,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
