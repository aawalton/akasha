import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const bird = {
  id: "01a06580-2494-7871-b674-a99406200efd",
  type: "page-type/world-character",
  slug: "bird",
  title: "Bird",
  world: "world/the-wandering-inn",
  maxLevel: 42,
  eventCount: 29,
  firstChapter: 65,
  lastChapter: 763,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
