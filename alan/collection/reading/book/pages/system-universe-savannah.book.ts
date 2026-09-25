import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const systemUniverseSavannah = {
  id: "019db533-f391-778b-9034-26f737dd3b3c",
  type: "page-type/book",
  slug: "system-universe-savannah",
  title: "System Universe: Savannah",
  status: "completed",
  author: "Christopher L. Delgado",
  unit: "unit/words",
  position: 3,
  ownLength: 122500,
  ownProgress: 122500,
  publishedAt: "2023-05-31",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BT5WF624",
      externalLink: "https://amazon.com/dp/B0BT5WF624",
    },
  ],
} as const satisfies Book
