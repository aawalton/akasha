import type { Book } from "../../book.page-type.ts"

export const anOutcastInAnotherWorldBook1 = {
  id: "019db533-f390-7751-93b5-72351f79757c",
  pageTypeSlug: "book",
  slug: "an-outcast-in-another-world-book-1",
  title: "An Outcast In Another World",
  status: "completed",
  author: "KamikazePotato ",
  unitSlug: "words",
  position: 1,
  ownLength: 112250,
  ownProgress: 112250,
  publishedAt: "2021-09-16",
  partOfSlugs: ["book-series/an-outcast-in-another-world"],
  source: "kindle",
  externalId: "B09FZ16ZNT",
  externalLink: "https://amazon.com/dp/B09FZ16ZNT",
} as const satisfies Book
