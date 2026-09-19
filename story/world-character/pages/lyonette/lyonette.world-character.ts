import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lyonette = {
  id: "01a06580-2494-738a-aa8f-89b000c9099d",
  type: "page-type/world-character",
  slug: "lyonette",
  title: "Lyonette du Marquin",
  world: "world/the-wandering-inn",
  maxLevel: 41,
  eventCount: 50,
  firstChapter: 95,
  lastChapter: 821,
  characterClaims: "jsonl",
  aliasOf: "world-character/lyonette-du-marquin",
} as const satisfies WorldCharacter
