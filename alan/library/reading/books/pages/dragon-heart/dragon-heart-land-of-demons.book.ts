import type { Book } from "../../book.page-type.ts"

export const dragonHeartLandOfDemons = {
  id: "019db533-f390-7e8b-8e9a-8efc8d01bc97",
  pageTypeSlug: "book",
  slug: "dragon-heart-land-of-demons",
  title: "Dragon Heart: Land of Demons",
  status: "completed",
  author: "Robert Baker Girdlestone",
  unitSlug: "words",
  position: 7,
  ownLength: 114500,
  ownProgress: 114500,
  publishedAt: "2020-08-12",
  partOfSlugs: ["book-series/dragon-heart"],
  source: "kindle",
  externalId: "B088VL8XNM",
  externalLink: "https://amazon.com/dp/B088VL8XNM",
} as const satisfies Book
