import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const drevish = {
  id: "01a0b70a-1ea3-7717-b6f0-2a1eb374063c",
  type: "page-type/world-character",
  slug: "drevish",
  title: "Drevish",
  world: "world/the-wandering-inn",
  firstChapter: 92,
  lastChapter: 681,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
