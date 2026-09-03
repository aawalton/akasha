import type { Book } from "../../book.page-type.ts"

export const dragonHeartSeaOfSorrow = {
  id: "019db533-f390-7e7f-917c-65ca8ab434fa",
  pageTypeSlug: "book",
  slug: "dragon-heart-sea-of-sorrow",
  title: "Dragon Heart: Sea of Sorrow",
  kind: "read",
  status: "completed",
  author: "Christopher Paolini",
  unitSlug: "words",
  position: 5,
  ownLength: 118250,
  ownProgress: 118250,
  publishedAt: "2020-03-11",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B082S3HBHV",
  externalLink: "https://amazon.com/dp/B082S3HBHV",
} as const satisfies Book
