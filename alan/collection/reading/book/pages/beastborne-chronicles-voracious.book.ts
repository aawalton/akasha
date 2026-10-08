import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const beastborneChroniclesVoracious = {
  id: "019db533-f390-78fb-933f-b244e29405ec",
  type: "page-type/book",
  slug: "beastborne-chronicles-voracious",
  title: "Beastborne Chronicles: Voracious",
  status: "completed",
  unit: "unit/words",
  position: 5,
  ownLength: 150000,
  ownProgress: 150000,
  publishedAt: "2024-04-02",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CZ6ZKP8K",
      externalLink: "https://amazon.com/dp/B0CZ6ZKP8K",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
