import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const voidknightAscension2 = {
  id: "019db533-f38a-74af-a302-7436fdebc243",
  type: "page-type/book",
  slug: "voidknight-ascension-2",
  title: "Voidknight Ascension 2",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 140000,
  ownProgress: 140000,
  publishedAt: "2024-02-02",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CTGQLT8T",
      externalLink: "https://amazon.com/dp/B0CTGQLT8T",
    },
  ],
} as const satisfies Book
