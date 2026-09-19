import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const calidusReinhart = {
  id: "01a06580-2494-7354-a37f-26d42e9b625f",
  type: "page-type/world-character",
  slug: "calidus-reinhart",
  title: "Calidus Reinhart",
  world: "world/the-wandering-inn",
  maxLevel: 28,
  eventCount: 5,
  firstChapter: 600,
  lastChapter: 823,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
