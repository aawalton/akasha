import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const seerOfSteel = {
  id: "01a0b70c-f031-7d77-b90e-2e2341438703",
  type: "page-type/world-character",
  slug: "seer-of-steel",
  title: "Seer of Steel",
  world: "world/the-wandering-inn",
  firstChapter: 335,
  lastChapter: 335,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
