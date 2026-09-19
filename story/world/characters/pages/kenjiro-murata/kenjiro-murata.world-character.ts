import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kenjiroMurata = {
  id: "01a06580-2494-7bb1-863a-db7fe501fe34",
  type: "page-type/world-character",
  slug: "kenjiro-murata",
  title: "Kenjiro Murata",
  world: "world/the-wandering-inn",
  maxLevel: 4,
  eventCount: 5,
  firstChapter: 195,
  lastChapter: 576,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
