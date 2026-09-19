import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const raseaZecrew = {
  id: "01a0b70c-86ce-79e3-8722-8bb10debfa10",
  type: "page-type/world-character",
  slug: "rasea-zecrew",
  title: "Rasea Zecrew",
  world: "world/the-wandering-inn",
  firstChapter: 454,
  lastChapter: 668,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
