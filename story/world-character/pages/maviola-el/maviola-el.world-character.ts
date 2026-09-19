import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const maviolaEl = {
  id: "01a06580-2494-7378-9fdc-f63e265b9de0",
  type: "page-type/world-character",
  slug: "maviola-el",
  title: "Lady Maviola El",
  world: "world/the-wandering-inn",
  maxLevel: 49,
  eventCount: 2,
  firstChapter: 416,
  lastChapter: 495,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
