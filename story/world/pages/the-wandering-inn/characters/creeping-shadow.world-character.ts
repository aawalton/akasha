import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const creepingShadow = {
  id: "01a0b70a-0954-77b4-9224-10730f3e43a4",
  type: "page-type/world-character",
  slug: "creeping-shadow",
  title: "the Creeping Shadow",
  world: "world/the-wandering-inn",
  firstChapter: 823,
  lastChapter: 823,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
