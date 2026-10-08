import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theViridianGateArchivesCataclysm = {
  id: "019db533-f38b-70c0-acd9-b967c3e7eeb0",
  type: "page-type/book",
  slug: "the-viridian-gate-archives-cataclysm",
  title: "The Viridian Gate Archives: Cataclysm",
  status: "completed",
  author: "J. A. Hunter",
  unit: "unit/words",
  position: 1,
  ownLength: 54750,
  ownProgress: 54750,
  publishedAt: "2016-12-23",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01MU0DYXW",
      externalLink: "https://amazon.com/dp/B01MU0DYXW",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
