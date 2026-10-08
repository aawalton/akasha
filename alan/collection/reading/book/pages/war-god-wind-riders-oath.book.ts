import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const warGodWindRidersOath = {
  id: "019db533-f39a-77d3-af55-3371b9d85992",
  type: "page-type/book",
  slug: "war-god-wind-riders-oath",
  title: "War God: Wind Rider's Oath",
  status: "not-started",
  author: "Winsor McCay",
  unit: "unit/words",
  position: 2,
  ownLength: 130500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00AP91U82",
      externalLink: "https://www.amazon.com/dp/B00AP91U82",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
