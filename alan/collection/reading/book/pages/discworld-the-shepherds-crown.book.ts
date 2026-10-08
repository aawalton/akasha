import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldTheShepherdsCrown = {
  id: "019db533-f388-7d5b-8a0c-e214f3a25efe",
  type: "page-type/book",
  slug: "discworld-the-shepherds-crown",
  title: "Discworld: The Shepherd's Crown",
  status: "not-started",
  author: "Terry Pratchett, Manuel Viciano Delibano, Paul Kidby, Laura Ellen Andersen",
  unit: "unit/words",
  position: 41,
  ownLength: 71250,
  publishedAt: "2015-09-01",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00W2EBY8O",
      externalLink: "https://www.amazon.com/gp/product/B00W2EBY8O",
    },
  ],
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
