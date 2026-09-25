import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cradleSkysworn = {
  id: "019db533-f390-7c5f-a348-3a683cb3d42a",
  type: "page-type/book",
  slug: "cradle-skysworn",
  title: "Cradle: Skysworn",
  status: "completed",
  author: "Will Wight",
  unit: "unit/words",
  position: 4,
  ownLength: 81000,
  ownProgress: 81000,
  publishedAt: "2017-09-30",
  partOfCollections: ["book-series/cradle"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0762YQ2H8",
      externalLink: "https://amazon.com/dp/B0762YQ2H8",
    },
  ],
} as const satisfies Book
