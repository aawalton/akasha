import type { Book } from "../../book.page-type.ts"

export const roadToMastery2 = {
  id: "019db533-f391-7546-a6ad-928cabf8be72",
  pageTypeSlug: "book",
  slug: "road-to-mastery-2",
  title: "Road to Mastery 2",
  kind: "read",
  status: "completed",
  author: "James Allen",
  unitSlug: "words",
  position: 2,
  ownLength: 199000,
  ownProgress: 199000,
  publishedAt: "2023-08-29",
  partOfSlugs: ["book-series/road-to-mastery"],
  source: "kindle",
  externalId: "B0C6FLPQV3",
  externalLink: "https://amazon.com/dp/B0C6FLPQV3",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
