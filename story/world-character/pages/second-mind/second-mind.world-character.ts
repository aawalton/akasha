import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const secondMind = {
  id: "01a0b70c-ef8b-7565-a865-d8bf05da3e5e",
  type: "page-type/world-character",
  slug: "second-mind",
  title: "Second Mind",
  world: "world/the-wandering-inn",
  firstChapter: 617,
  lastChapter: 617,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
