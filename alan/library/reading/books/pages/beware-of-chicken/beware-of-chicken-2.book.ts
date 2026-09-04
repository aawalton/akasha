import type { Book } from "../../book.page-type.ts"

export const bewareOfChicken2 = {
  id: "019db533-f390-7a10-a564-4c5f152e18b6",
  pageTypeSlug: "book",
  slug: "beware-of-chicken-2",
  title: "Beware of Chicken 2",
  status: "completed",
  author: "Casualfarmer",
  unitSlug: "words",
  position: 2,
  ownLength: 131250,
  ownProgress: 131250,
  publishedAt: "2023-03-28",
  partOfSlugs: ["book-series/beware-of-chicken"],
  source: "kindle",
  externalId: "B0BSMDGBYJ",
  externalLink: "https://amazon.com/dp/B0BSMDGBYJ",
} as const satisfies Book
