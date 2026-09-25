import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesAmerica = {
  id: "019db533-f390-7773-8421-e41a7143c522",
  type: "page-type/book",
  slug: "artorians-archives-america",
  title: "Artorian's Archives: America",
  status: "not-started",
  unit: "unit/words",
  position: 18,
  ownLength: 116000,
  publishedAt: "2024-05-29",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CWDYMWQB",
      externalLink: "https://amazon.com/dp/B0CWDYMWQB",
    },
  ],
} as const satisfies Book
