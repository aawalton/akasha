import type { BookCollection } from "../book-collection.page-type.ts"

export const unfinishedTalesOfNumenorAndMiddleEarth = {
  id: "01a06808-148f-703b-8341-acb5a7274256",
  pageTypeSlug: "book-collection",
  slug: "unfinished-tales-of-numenor-and-middle-earth",
  title: "Unfinished Tales of Númenor and Middle-earth",
  partOfSlugs: ["the-lord-of-the-rings-books"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  publishedAt: "1980-01-01",
} as const satisfies BookCollection
