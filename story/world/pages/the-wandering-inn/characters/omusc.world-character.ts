import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const omusc = {
  id: "01a0b70c-1875-781d-a3ce-e4bb603203a7",
  type: "page-type/world-character",
  slug: "omusc",
  title: "Omusc",
  world: "world/the-wandering-inn",
  firstChapter: 548,
  lastChapter: 553,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
