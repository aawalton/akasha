import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const liska = {
  id: "01a06580-2494-76e5-b9ca-0757b2955c15",
  type: "page-type/world-character",
  slug: "liska",
  title: "Liska",
  world: "world/the-wandering-inn",
  maxLevel: 34,
  eventCount: 7,
  firstChapter: 610,
  lastChapter: 821,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
