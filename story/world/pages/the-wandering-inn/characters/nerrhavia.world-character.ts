import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nerrhavia = {
  id: "01a0b70c-059f-71c6-b7ff-b1a4ea000bcc",
  type: "page-type/world-character",
  slug: "nerrhavia",
  title: "Nerrhavia",
  world: "world/the-wandering-inn",
  firstChapter: 523,
  lastChapter: 770,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
