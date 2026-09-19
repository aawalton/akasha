import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lordYebior = {
  id: "01a0b70b-8c4b-7187-847b-df3fb4a5af6c",
  type: "page-type/world-character",
  slug: "lord-yebior",
  title: "Lord Yebior",
  world: "world/the-wandering-inn",
  firstChapter: 217,
  lastChapter: 217,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
