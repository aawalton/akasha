import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ginthe = {
  id: "01a0b70a-9e32-79e9-a37a-fc2a1d927f6d",
  type: "page-type/world-character",
  slug: "ginthe",
  title: "Ginthe",
  world: "world/the-wandering-inn",
  firstChapter: 803,
  lastChapter: 803,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
