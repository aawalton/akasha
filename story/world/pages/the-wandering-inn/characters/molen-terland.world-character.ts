import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const molenTerland = {
  id: "01a0b70b-f136-78f5-85f1-f1f07a1ff4c2",
  type: "page-type/world-character",
  slug: "molen-terland",
  title: "Molen Terland",
  world: "world/the-wandering-inn",
  firstChapter: 798,
  lastChapter: 798,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
