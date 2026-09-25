import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesAccords = {
  id: "019db533-f390-77fd-a908-28736885cea9",
  type: "page-type/book",
  slug: "artorians-archives-accords",
  title: "Artorian's Archives: Accords",
  status: "not-started",
  unit: "unit/words",
  position: 11,
  ownLength: 90000,
  publishedAt: "2022-07-20",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B5YDPJ4L",
      externalLink: "https://amazon.com/dp/B0B5YDPJ4L",
    },
  ],
} as const satisfies Book
