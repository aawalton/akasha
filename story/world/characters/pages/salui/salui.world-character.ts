import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const salui = {
  id: "01a0b70c-abad-744c-9ae6-2b3014edd5e0",
  type: "page-type/world-character",
  slug: "salui",
  title: "Salui",
  world: "world/the-wandering-inn",
  firstChapter: 548,
  lastChapter: 548,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
