import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const somniaOnlineFragments = {
  id: "019db533-f391-764b-bbfb-9769905eb029",
  type: "page-type/book",
  slug: "somnia-online-fragments",
  title: "Somnia Online: Fragments",
  status: "completed",
  unit: "unit/words",
  position: 3,
  ownLength: 88750,
  ownProgress: 88750,
  publishedAt: "2018-11-09",
  partOfCollections: ["book-series/somnia-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07KCZ7HN3",
      externalLink: "https://amazon.com/dp/B07KCZ7HN3",
    },
  ],
} as const satisfies Book
