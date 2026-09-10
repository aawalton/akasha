import type { Book } from "../book.page-type.types.ts"

export const aThousandLiTheThirdRealm = {
  id: "019db533-f390-75f5-9943-ec629524782c",
  pageTypeSlug: "book",
  type: "book",
  slug: "a-thousand-li-the-third-realm",
  title: "A Thousand Li: The Third Realm",
  status: "completed",
  author: "Tao Wong",
  unit: "words",
  position: 8,
  ownLength: 125250,
  ownProgress: 125250,
  publishedAt: "2023-02-01",
  partOfCollections: ["book-series/a-thousand-li"],
  source: "kindle",
  externalId: "B0B4PW3V2D",
  externalLink: "https://amazon.com/dp/B0B4PW3V2D",
} as const satisfies Book
