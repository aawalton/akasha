import type { WorldCharacter } from "../world-character.page-type.ts"

export const horrorGirl = {
  id: "01a06580-2494-7450-85c7-caa155995ead",
  pageTypeSlug: "world-character",
  slug: "horror-girl",
  title: "survivor of Esthelm",
  worldSlug: "the-wandering-inn",
  eventCount: 3,
  firstChapter: 143,
  lastChapter: 143,
} as const satisfies WorldCharacter
