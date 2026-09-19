import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wingsy = {
  id: "01a0b70d-9ed5-7791-981b-34e9b9da92a4",
  type: "page-type/world-character",
  slug: "wingsy",
  title: "Wingsy",
  world: "world/the-wandering-inn",
  firstChapter: 811,
  lastChapter: 811,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
