import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chrysalisTheAntventureBegins = {
  id: "019db533-f390-7ba3-94f6-01fc614d26c4",
  type: "page-type/book",
  slug: "chrysalis-the-antventure-begins",
  title: "Chrysalis: The Antventure Begins",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 166000,
  ownProgress: 166000,
  publishedAt: "2022-06-07",
  partOfCollections: ["book-series/chrysalis"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09T7ZN7NC",
      externalLink: "https://amazon.com/dp/B09T7ZN7NC",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
