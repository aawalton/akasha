import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const orrell = {
  id: "01a0b70c-1c0c-7c67-abc4-4e6275ae495b",
  type: "page-type/world-character",
  slug: "orrell",
  title: "Orrell",
  world: "world/the-wandering-inn",
  firstChapter: 817,
  lastChapter: 817,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
