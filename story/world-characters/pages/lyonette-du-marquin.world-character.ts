import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const lyonetteDuMarquin = {
  id: "01a06580-2494-76a7-9c5d-212d2617f34c",
  type: "world-character",
  slug: "lyonette-du-marquin",
  title: "Lyonette du Marquin",
  world: "the-wandering-inn",
  maxLevel: 38,
  eventCount: 19,
  firstChapter: 424,
  lastChapter: 744,
} as const satisfies WorldCharacter
