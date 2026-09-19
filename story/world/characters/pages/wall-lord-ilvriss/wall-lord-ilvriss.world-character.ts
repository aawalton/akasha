import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const wallLordIlvriss = {
  id: "01a0b70d-98d9-7d27-9659-b3aae11340f2",
  type: "page-type/world-character",
  slug: "wall-lord-ilvriss",
  title: "Wall Lord Ilvriss",
  world: "world/the-wandering-inn",
  firstChapter: 208,
  lastChapter: 508,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
