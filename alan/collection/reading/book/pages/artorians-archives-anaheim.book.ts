import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesAnaheim = {
  id: "019db533-f390-7768-8171-75c62c966707",
  type: "page-type/book",
  slug: "artorians-archives-anaheim",
  title: "Artorian's Archives: Anaheim",
  status: "not-started",
  unit: "unit/words",
  position: 17,
  ownLength: 124500,
  publishedAt: "2024-02-21",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CNG132B7",
      externalLink: "https://amazon.com/dp/B0CNG132B7",
    },
  ],
} as const satisfies Book
