import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const centaurSoldier = {
  id: "01a0b709-f96b-73b4-9a03-9047495bc325",
  type: "page-type/world-character",
  slug: "centaur-soldier",
  title: "Centaur",
  world: "world/the-wandering-inn",
  firstChapter: 131,
  lastChapter: 131,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
