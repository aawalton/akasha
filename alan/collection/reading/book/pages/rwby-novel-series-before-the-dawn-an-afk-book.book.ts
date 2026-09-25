import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const rwbyNovelSeriesBeforeTheDawnAnAfkBook = {
  id: "019db533-f38b-71a6-8f1e-6a21213bb7c0",
  type: "page-type/book",
  slug: "rwby-novel-series-before-the-dawn-an-afk-book",
  title: "RWBY Novel Series: Before the Dawn: An AFK Book",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 75750,
  publishedAt: "2020-07-21",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07VZ1J662",
      externalLink: "https://amazon.com/dp/B07VZ1J662",
    },
  ],
} as const satisfies Book
