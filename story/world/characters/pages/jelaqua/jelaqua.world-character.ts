import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const jelaqua = {
  id: "01a06580-2494-7ded-a97e-0136dd2643f0",
  type: "page-type/world-character",
  slug: "jelaqua",
  title: "Jelaqua Ivirith",
  world: "world/the-wandering-inn",
  maxLevel: 34,
  eventCount: 17,
  firstChapter: 96,
  lastChapter: 786,
  characterClaims: "jsonl",
  aliasOf: "world-character/jelaqua-ivirith",
} as const satisfies WorldCharacter
