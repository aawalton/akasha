import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lakenGodart = {
  id: "01a06580-2494-786b-b1ff-7d1b75543a4e",
  type: "page-type/world-character",
  slug: "laken-godart",
  title: "Laken Godart",
  world: "world/the-wandering-inn",
  maxLevel: 37,
  eventCount: 11,
  firstChapter: 124,
  lastChapter: 715,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
