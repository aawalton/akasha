import type { Book } from "../../book.page-type.ts"

export const somniaOnlineDistortion = {
  id: "019db533-f391-7621-9dce-5ca701b81eef",
  pageTypeSlug: "book",
  slug: "somnia-online-distortion",
  title: "Somnia Online: Distortion",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 5,
  ownLength: 86750,
  ownProgress: 86750,
  publishedAt: "2019-08-22",
  partOfSlugs: ["book-series/somnia-online"],
  source: "kindle",
  externalId: "B07WR6FG96",
  externalLink: "https://amazon.com/dp/B07WR6FG96",
} as const satisfies Book
