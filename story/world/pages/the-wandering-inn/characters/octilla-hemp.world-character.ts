import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const octillaHemp = {
  id: "01a0b70c-148e-76b0-b4d3-f9abb77a0c73",
  type: "page-type/world-character",
  slug: "octilla-hemp",
  title: "Octilla Hemp",
  world: "world/the-wandering-inn",
  firstChapter: 445,
  lastChapter: 445,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
