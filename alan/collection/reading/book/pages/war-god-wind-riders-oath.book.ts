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
} as const satisfies Book
