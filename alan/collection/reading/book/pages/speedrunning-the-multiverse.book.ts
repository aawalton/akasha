import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const speedrunningTheMultiverse = {
  id: "019db533-f391-7670-aaa1-f6ebe4eca46b",
  type: "page-type/book",
  slug: "speedrunning-the-multiverse",
  title: "Speedrunning the Multiverse",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 139000,
  ownProgress: 139000,
  publishedAt: "2023-07-19",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C2DDV1KX",
      externalLink: "https://amazon.com/dp/B0C2DDV1KX",
    },
  ],
} as const satisfies Book
