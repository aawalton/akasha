import type { Book } from "../../book.page-type.ts"

export const mrPenumbras24HourBookstore = {
  id: "019db533-f388-7a77-9028-cf73ee567ae9",
  pageTypeSlug: "book",
  slug: "mr-penumbras-24-hour-bookstore",
  title: "Mr. Penumbra's 24-Hour Bookstore",
  kind: "read",
  status: "not-started",
  author: "Robin Sloan, Robin Sloan, Ari Fliakos, Robin Sloane",
  unitSlug: "words",
  ownLength: 72000,
  publishedAt: "2013-09-24",
  source: "kindle",
  externalId: "1250037751",
  externalLink: "https://www.amazon.com/Mr-Penumbras-24-Hour-Bookstore-Novel/dp/1250037751",
} as const satisfies Book
