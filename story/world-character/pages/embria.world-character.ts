import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const embria = {
  id: "01a06580-2494-74e8-8287-c3a1fe9ed588",
  type: "page-type/world-character",
  slug: "embria",
  title: "Embria",
  world: "world/the-wandering-inn",
  maxLevel: 29,
  eventCount: 5,
  firstChapter: 258,
  lastChapter: 810,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
