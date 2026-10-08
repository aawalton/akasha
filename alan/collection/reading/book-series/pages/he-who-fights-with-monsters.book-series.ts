import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const heWhoFightsWithMonsters = {
  id: "019db533-f38b-781a-af2a-188b9c782033",
  type: "page-type/book-series",
  slug: "he-who-fights-with-monsters",
  title: "He Who Fights with Monsters",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08WF8SB71",
      externalLink: "https://www.amazon.com/dp/B08WF8SB71",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
