import type { Book } from "../../book.page-type.ts"

export const dragonHeartWayToTheNorth = {
  id: "019db533-f390-7ddb-a5d2-024363002a64",
  pageTypeSlug: "book",
  slug: "dragon-heart-way-to-the-north",
  title: "Dragon Heart: Way To The North",
  kind: "read",
  status: "not-started",
  author: "Bible",
  unitSlug: "words",
  position: 19,
  ownLength: 118500,
  publishedAt: "2023-07-12",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B0BZPLKCQ2",
  externalLink: "https://amazon.com/dp/B0BZPLKCQ2",
} as const satisfies Book
