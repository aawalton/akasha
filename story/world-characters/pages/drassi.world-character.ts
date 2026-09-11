import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const drassi = {
  id: "01a06580-2494-7e25-95ab-fee74eeee689",
  type: "world-character",
  slug: "drassi",
  title: "Drassi",
  world: "the-wandering-inn",
  eventCount: 2,
  firstChapter: 435,
  lastChapter: 435,
} as const satisfies WorldCharacter
