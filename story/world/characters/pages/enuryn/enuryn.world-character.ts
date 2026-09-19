import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const enuryn = {
  id: "01a0b70a-6de4-76cd-aa1a-44cfd20459f2",
  type: "page-type/world-character",
  slug: "enuryn",
  title: "Enuryn",
  world: "world/the-wandering-inn",
  firstChapter: 755,
  lastChapter: 801,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
