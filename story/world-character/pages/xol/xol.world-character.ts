import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const xol = {
  id: "01a0b70d-d7d2-7ea5-a4a0-1cd97d23691a",
  type: "page-type/world-character",
  slug: "xol",
  title: "Xol",
  world: "world/the-wandering-inn",
  firstChapter: 334,
  lastChapter: 335,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
