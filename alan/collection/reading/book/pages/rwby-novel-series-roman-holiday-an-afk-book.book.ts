import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const rwbyNovelSeriesRomanHolidayAnAfkBook = {
  id: "019db533-f38b-71d1-8fc6-14b76b0d961f",
  type: "page-type/book",
  slug: "rwby-novel-series-roman-holiday-an-afk-book",
  title: "RWBY Novel Series: Roman Holiday: An AFK Book",
  status: "not-started",
  unit: "unit/words",
  position: 3,
  ownLength: 63500,
  publishedAt: "2021-09-07",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08XMNNGL3",
      externalLink: "https://amazon.com/dp/B08XMNNGL3",
    },
  ],
} as const satisfies Book
