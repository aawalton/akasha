import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const horrorGirl = {
  id: "01a06580-2494-7450-85c7-caa155995ead",
  type: "world-character",
  slug: "horror-girl",
  title: "survivor of Esthelm",
  world: "the-wandering-inn",
  eventCount: 3,
  firstChapter: 143,
  lastChapter: 143,
} as const satisfies WorldCharacter
