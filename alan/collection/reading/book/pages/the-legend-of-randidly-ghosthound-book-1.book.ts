import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLegendOfRandidlyGhosthoundBook1 = {
  id: "019db533-f391-79f3-a6e1-45abefa6e645",
  type: "page-type/book",
  slug: "the-legend-of-randidly-ghosthound-book-1",
  title: "The Legend of Randidly Ghosthound",
  status: "completed",
  author: "Noret Flood",
  unit: "unit/words",
  position: 1,
  ownLength: 143500,
  ownProgress: 143500,
  publishedAt: "2021-11-09",
  partOfCollections: ["book-series/the-legend-of-randidly-ghosthound"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09BNSH5KG",
      externalLink: "https://amazon.com/dp/B09BNSH5KG",
    },
  ],
} as const satisfies Book
