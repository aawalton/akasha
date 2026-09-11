import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const felkhr = {
  id: "01a06580-2494-725e-93f2-899417d56fb9",
  type: "world-character",
  slug: "felkhr",
  title: "Felkhr",
  world: "the-wandering-inn",
  maxLevel: 38,
  eventCount: 2,
  firstChapter: 644,
  lastChapter: 644,
} as const satisfies WorldCharacter
