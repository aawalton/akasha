import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const jelaqua = {
  id: "01a06580-2494-7ded-a97e-0136dd2643f0",
  type: "page-type/world-character",
  slug: "jelaqua",
  title: "Jelaqua",
  world: "world/the-wandering-inn",
  maxLevel: 34,
  eventCount: 17,
  firstChapter: 506,
  lastChapter: 789,
} as const satisfies WorldCharacter
