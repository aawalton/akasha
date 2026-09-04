import type { Book } from "../../book.page-type.ts"

export const azarinthHealerBook1 = {
  id: "019db533-f390-78ec-9069-e7528917fe02",
  pageTypeSlug: "book",
  slug: "azarinth-healer-book-1",
  title: "Azarinth Healer",
  status: "completed",
  author: "Rhaegar",
  unitSlug: "words",
  position: 1,
  ownLength: 177000,
  ownProgress: 177000,
  publishedAt: "2022-12-01",
  partOfSlugs: ["book-series/azarinth-healer"],
  source: "kindle",
  externalId: "B0BLRD8YPD",
  externalLink: "https://amazon.com/dp/B0BLRD8YPD",
} as const satisfies Book
