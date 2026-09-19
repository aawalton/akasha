import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rastandius = {
  id: "01a0b70c-873d-73a1-bb6b-92f021d44f18",
  type: "page-type/world-character",
  slug: "rastandius",
  title: "Rastandius",
  world: "world/the-wandering-inn",
  firstChapter: 601,
  lastChapter: 601,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
