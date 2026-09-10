import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const pisces = {
  id: "01a06580-2495-755b-839a-22cd62d57e6a",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "pisces",
  title: "Pisces",
  world: "the-wandering-inn",
  eventCount: 1,
  firstChapter: 522,
  lastChapter: 522,
} as const satisfies WorldCharacter
