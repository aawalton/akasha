import type { WorldCharacter } from "../world-character.page-type.ts"

export const treyAtwood = {
  id: "01a06580-2495-7f83-87b5-ff73ca63153c",
  pageTypeSlug: "world-character",
  slug: "trey-atwood",
  title: "Trey",
  worldSlug: "the-wandering-inn",
  maxLevel: 20,
  eventCount: 15,
  firstChapter: 399,
  lastChapter: 559,
} as const satisfies WorldCharacter
