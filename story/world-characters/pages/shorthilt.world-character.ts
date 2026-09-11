import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const shorthilt = {
  id: "01a06580-2495-7b54-9943-3b42d83bd61a",
  type: "world-character",
  slug: "shorthilt",
  title: "Shorthilt",
  world: "the-wandering-inn",
  maxLevel: 24,
  eventCount: 2,
  firstChapter: 283,
  lastChapter: 283,
} as const satisfies WorldCharacter
