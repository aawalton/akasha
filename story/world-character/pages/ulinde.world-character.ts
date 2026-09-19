import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ulinde = {
  id: "01a06580-2495-76ca-b2e3-f799751ff084",
  type: "page-type/world-character",
  slug: "ulinde",
  title: "Ulinde",
  world: "world/the-wandering-inn",
  maxLevel: 28,
  eventCount: 3,
  firstChapter: 374,
  lastChapter: 786,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
