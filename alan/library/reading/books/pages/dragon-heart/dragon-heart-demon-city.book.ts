import type { Book } from "../../book.page-type.ts"

export const dragonHeartDemonCity = {
  id: "019db533-f390-7e3a-88ca-91a54a367318",
  pageTypeSlug: "book",
  slug: "dragon-heart-demon-city",
  title: "Dragon Heart: Demon City",
  status: "completed",
  author: "Edgar Allan Poe",
  unitSlug: "words",
  position: 13,
  ownLength: 111000,
  ownProgress: 111000,
  publishedAt: "2021-12-05",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B09CL91C91",
  externalLink: "https://amazon.com/dp/B09CL91C91",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
