import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const artoriansArchivesArcoplex = {
  id: "019db533-f390-77a2-878c-0c153af7702b",
  type: "page-type/book",
  slug: "artorians-archives-arcoplex",
  title: "Artorian's Archives: Arcoplex",
  status: "not-started",
  unit: "unit/words",
  position: 14,
  ownLength: 122500,
  publishedAt: "2023-04-12",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BVC13NHS",
      externalLink: "https://amazon.com/dp/B0BVC13NHS",
    },
  ],
} as const satisfies Book
