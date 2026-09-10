import type { Book } from "../book.page-type.types.ts"

export const guardianOfAsterFallMoonlightRelic = {
  id: "019db533-f390-7faa-9b7f-4564c5acba53",
  pageTypeSlug: "book",
  type: "book",
  slug: "guardian-of-aster-fall-moonlight-relic",
  title: "Guardian of Aster Fall: Moonlight Relic",
  status: "completed",
  author: "David North",
  unit: "words",
  position: 3,
  ownLength: 111250,
  ownProgress: 111250,
  publishedAt: "2022-06-21",
  partOfCollections: ["book-series/guardian-of-aster-fall"],
  source: "kindle",
  externalId: "B09W7BQB41",
  externalLink: "https://amazon.com/dp/B09W7BQB41",
} as const satisfies Book
