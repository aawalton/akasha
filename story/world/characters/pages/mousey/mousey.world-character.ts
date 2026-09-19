import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mousey = {
  id: "01a0b70b-f84d-7ca7-a7f0-224658a0aea8",
  type: "page-type/world-character",
  slug: "mousey",
  title: "Mousey",
  world: "world/the-wandering-inn",
  firstChapter: 377,
  lastChapter: 377,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
