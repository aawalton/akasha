import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const olesm = {
  id: "01a06580-2495-7c82-9dcf-360b73bf75ef",
  type: "world-character",
  slug: "olesm",
  title: "Olesm",
  world: "the-wandering-inn",
  maxLevel: 35,
  eventCount: 18,
  firstChapter: 223,
  lastChapter: 563,
} as const satisfies WorldCharacter
