import type { Book } from "../../book.page-type.ts"

export const dragonHeartBloodWill = {
  id: "019db533-f390-7eba-b913-1ac9cb4f8441",
  pageTypeSlug: "book",
  slug: "dragon-heart-blood-will",
  title: "Dragon Heart: Blood Will",
  status: "completed",
  author: "SuperSummary",
  unitSlug: "words",
  position: 3,
  ownLength: 80250,
  ownProgress: 80250,
  publishedAt: "2019-10-22",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B07XG63C8P",
  externalLink: "https://amazon.com/dp/B07XG63C8P",
} as const satisfies Book
