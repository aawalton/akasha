import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const luanKhumalo = {
  id: "01a06580-2494-77d6-945b-84329d157c7d",
  type: "page-type/world-character",
  slug: "luan-khumalo",
  title: "Luan Khumalo",
  world: "world/the-wandering-inn",
  maxLevel: 14,
  eventCount: 10,
  firstChapter: 195,
  lastChapter: 576,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
