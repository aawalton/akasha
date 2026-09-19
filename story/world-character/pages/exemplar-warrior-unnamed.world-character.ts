import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const exemplarWarriorUnnamed = {
  id: "01a06580-2494-7dd3-b3cb-9cefe751790b",
  type: "page-type/world-character",
  slug: "exemplar-warrior-unnamed",
  title: "Exemplar Warrior",
  world: "world/the-wandering-inn",
  maxLevel: 17,
  eventCount: 7,
  firstChapter: 532,
  lastChapter: 532,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
