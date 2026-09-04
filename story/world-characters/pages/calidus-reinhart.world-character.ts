import type { WorldCharacter } from "../world-character.page-type.ts"

export const calidusReinhart = {
  id: "01a06580-2494-7354-a37f-26d42e9b625f",
  pageTypeSlug: "world-character",
  slug: "calidus-reinhart",
  title: "Calidus",
  worldSlug: "the-wandering-inn",
  maxLevel: 28,
  eventCount: 5,
  firstChapter: 823,
  lastChapter: 823,
} as const satisfies WorldCharacter
