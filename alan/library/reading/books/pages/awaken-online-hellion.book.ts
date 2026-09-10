import type { Book } from "../book.page-type.types.ts"

export const awakenOnlineHellion = {
  id: "019db533-f390-7863-8972-a6a66f741a96",
  pageTypeSlug: "book",
  type: "book",
  slug: "awaken-online-hellion",
  title: "Awaken Online: Hellion",
  status: "completed",
  unit: "words",
  position: 8,
  ownLength: 180500,
  ownProgress: 180500,
  publishedAt: "2021-05-01",
  partOfCollections: ["book-series/awaken-online"],
  source: "kindle",
  externalId: "B08XYCCH8Q",
  externalLink: "https://amazon.com/dp/B08XYCCH8Q",
} as const satisfies Book
