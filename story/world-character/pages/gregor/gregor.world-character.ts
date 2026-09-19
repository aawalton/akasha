import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gregor = {
  id: "01a0b70a-e9de-78e1-9de7-0cc433229b4c",
  type: "page-type/world-character",
  slug: "gregor",
  title: "Gregor",
  world: "world/the-wandering-inn",
  firstChapter: 50,
  lastChapter: 62,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
