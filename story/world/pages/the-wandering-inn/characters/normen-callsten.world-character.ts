import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const normenCallsten = {
  id: "01a06580-2495-75b4-ae05-a5fdf3ca94e7",
  type: "page-type/world-character",
  slug: "normen-callsten",
  title: "Normen",
  world: "world/the-wandering-inn",
  maxLevel: 27,
  eventCount: 2,
  firstChapter: 714,
  lastChapter: 715,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
