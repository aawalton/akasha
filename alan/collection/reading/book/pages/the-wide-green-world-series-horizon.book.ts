import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWideGreenWorldSeriesHorizon = {
  id: "019db533-f39b-7102-b853-27506dda2f6f",
  type: "page-type/book",
  slug: "the-wide-green-world-series-horizon",
  title: "The Wide Green World Series: Horizon",
  status: "not-started",
  author: "Oscar Wilde",
  unit: "unit/words",
  position: 3,
  ownLength: 111750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B001NLL8UG",
      externalLink: "https://www.amazon.com/dp/B001NLL8UG",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
