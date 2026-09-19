import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const corbbin = {
  id: "01a0b70a-078b-7904-a7f5-cd72608e786e",
  type: "page-type/world-character",
  slug: "corbbin",
  title: "Corbbin",
  world: "world/the-wandering-inn",
  firstChapter: 600,
  lastChapter: 600,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
