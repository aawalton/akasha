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
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
