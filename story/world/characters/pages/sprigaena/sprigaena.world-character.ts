import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sprigaena = {
  id: "01a0b70d-0bf7-7017-8dd1-5e8758ba85c5",
  type: "page-type/world-character",
  slug: "sprigaena",
  title: "Sprigaena",
  world: "world/the-wandering-inn",
  firstChapter: 578,
  lastChapter: 581,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
