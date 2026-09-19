import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const warsh = {
  id: "01a0b70d-9a76-71aa-9f96-2b1568fb8566",
  type: "page-type/world-character",
  slug: "warsh",
  title: "Warsh",
  world: "world/the-wandering-inn",
  firstChapter: 328,
  lastChapter: 328,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
