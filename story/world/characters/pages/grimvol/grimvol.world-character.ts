import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const grimvol = {
  id: "01a0b70a-ec5e-7a0b-89c6-50a7d5dea82b",
  type: "page-type/world-character",
  slug: "grimvol",
  title: "Grimvol",
  world: "world/the-wandering-inn",
  firstChapter: 111,
  lastChapter: 111,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
