import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const somniaOnlineAnomaly = {
  id: "019db533-f391-7652-90aa-5028224b4093",
  type: "page-type/book",
  slug: "somnia-online-anomaly",
  title: "Somnia Online: Anomaly",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 88750,
  ownProgress: 88750,
  publishedAt: "2018-08-16",
  partOfCollections: ["book-series/somnia-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07GCZ87G1",
      externalLink: "https://amazon.com/dp/B07GCZ87G1",
    },
  ],
} as const satisfies Book
