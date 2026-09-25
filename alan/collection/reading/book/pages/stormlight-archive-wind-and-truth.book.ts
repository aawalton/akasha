import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const stormlightArchiveWindAndTruth = {
  id: "019db533-f38a-7bf2-aaae-40c879e5b8fc",
  type: "page-type/book",
  slug: "stormlight-archive-wind-and-truth",
  title: "Stormlight Archive: Wind and Truth",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 5,
  ownLength: 329000,
  publishedAt: "2024-12-06",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CPWQZNQB",
      externalLink: "https://amazon.com/dp/B0CPWQZNQB",
    },
  ],
} as const satisfies Book
