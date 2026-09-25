import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const mrPenumbras24HourBookstore = {
  id: "019db533-f388-7a77-9028-cf73ee567ae9",
  type: "page-type/book",
  slug: "mr-penumbras-24-hour-bookstore",
  title: "Mr. Penumbra's 24-Hour Bookstore",
  status: "not-started",
  author: "Robin Sloan, Robin Sloan, Ari Fliakos, Robin Sloane",
  unit: "unit/words",
  ownLength: 72000,
  publishedAt: "2013-09-24",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "1250037751",
      externalLink: "https://www.amazon.com/Mr-Penumbras-24-Hour-Bookstore-Novel/dp/1250037751",
    },
  ],
} as const satisfies Book
