import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const marsTrilogyGreenMars = {
  id: "019db533-f39b-70a6-861d-49199813f464",
  type: "page-type/book",
  slug: "mars-trilogy-green-mars",
  title: "Mars Trilogy: Green Mars",
  status: "not-started",
  author: "Kim Stanley Robinson",
  unit: "unit/words",
  position: 1,
  ownLength: 175250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000QCS91E",
      externalLink: "https://www.amazon.com/dp/B000QCS91E",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
