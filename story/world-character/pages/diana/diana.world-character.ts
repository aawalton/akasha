import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const diana = {
  id: "01a0b70a-1912-7982-a362-5d6fd4bec147",
  type: "page-type/world-character",
  slug: "diana",
  title: "Diana",
  world: "world/the-wandering-inn",
  firstChapter: 316,
  lastChapter: 316,
} as const satisfies WorldCharacter
