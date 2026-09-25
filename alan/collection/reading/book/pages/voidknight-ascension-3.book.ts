import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const voidknightAscension3 = {
  id: "019db533-f38a-7486-a72a-15d8f4d5cb90",
  type: "page-type/book",
  slug: "voidknight-ascension-3",
  title: "Voidknight Ascension 3",
  status: "completed",
  unit: "unit/words",
  position: 3,
  ownLength: 135500,
  ownProgress: 135500,
  publishedAt: "2024-06-02",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D5XFZBQP",
      externalLink: "https://amazon.com/dp/B0D5XFZBQP",
    },
  ],
} as const satisfies Book
