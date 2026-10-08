import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const disgardiumResistance = {
  id: "019db533-f390-7da7-9dad-76feb80b95fb",
  type: "page-type/book",
  slug: "disgardium-resistance",
  title: "Disgardium: Resistance",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 128250,
  ownProgress: 128250,
  publishedAt: "2020-04-29",
  partOfCollections: ["book-series/disgardium"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B084VPKL7N",
      externalLink: "https://amazon.com/dp/B084VPKL7N",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
