import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pirose = {
  id: "01a0b70c-6dc0-749e-9344-ed7d9933c5a3",
  type: "page-type/world-character",
  slug: "pirose",
  title: "Pirose",
  world: "world/the-wandering-inn",
  firstChapter: 345,
  lastChapter: 345,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
