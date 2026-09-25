import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const rwbyNovelSeriesAfterTheFallAnAfkBook = {
  id: "019db533-f38b-71c7-8c9b-8039c323cba2",
  type: "page-type/book",
  slug: "rwby-novel-series-after-the-fall-an-afk-book",
  title: "RWBY Novel Series: After the Fall: An AFK Book",
  status: "not-started",
  unit: "unit/words",
  position: 1,
  ownLength: 65250,
  publishedAt: "2019-06-25",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07HPF3N9S",
      externalLink: "https://amazon.com/dp/B07HPF3N9S",
    },
  ],
} as const satisfies Book
