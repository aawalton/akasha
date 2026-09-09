import type { Book } from "../../book.page-type.ts"

export const dragonHeartDragonCity = {
  id: "019db533-f390-7df7-93ea-abc0770169fb",
  pageTypeSlug: "book",
  slug: "dragon-heart-dragon-city",
  title: "Dragon Heart: Dragon City",
  status: "completed",
  author: "Edgar Allan Poe",
  unit: "words",
  position: 15,
  ownLength: 111000,
  ownProgress: 111000,
  publishedAt: "2022-06-15",
  partOfCollections: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B09THFYK14",
  externalLink: "https://amazon.com/dp/B09THFYK14",
} as const satisfies Book
