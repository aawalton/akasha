import type { WorldCharacter } from "../world-character.page-type.ts"

export const genevaScala = {
  id: "01a06580-2494-7a9c-860b-30b005a50252",
  pageTypeSlug: "world-character",
  slug: "geneva-scala",
  title: "Geneva Scala",
  worldSlug: "the-wandering-inn",
  maxLevel: 37,
  eventCount: 18,
  firstChapter: 130,
  lastChapter: 618,
} as const satisfies WorldCharacter
