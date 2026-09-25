import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const warbreaker = {
  id: "019db533-f39d-7337-90d4-df0cb121d663",
  type: "page-type/book",
  slug: "warbreaker",
  title: "Warbreaker",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 4,
  ownLength: 159500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B087JNJKMS",
      externalLink: "https://www.amazon.com/dp/B087JNJKMS",
    },
  ],
} as const satisfies Book
