import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const drassi = {
  id: "01a06580-2494-7e25-95ab-fee74eeee689",
  type: "page-type/world-character",
  slug: "drassi",
  title: "Drassi",
  world: "world/the-wandering-inn",
  eventCount: 2,
  firstChapter: 13,
  lastChapter: 803,
  characterClaims: "jsonl",
  aliasOf: "world-character/drassi-tewing",
} as const satisfies WorldCharacter
