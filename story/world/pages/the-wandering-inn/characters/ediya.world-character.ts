import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ediya = {
  id: "01a0b70a-234d-7d86-9450-9727d8a719ec",
  type: "page-type/world-character",
  slug: "ediya",
  title: "Ediya",
  world: "world/the-wandering-inn",
  firstChapter: 785,
  lastChapter: 785,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
