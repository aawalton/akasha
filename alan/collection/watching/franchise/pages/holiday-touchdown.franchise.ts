import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const holidayTouchdown = {
  id: "01a17497-195a-7a65-9ee0-b08f634232a0",
  type: "page-type/franchise",
  slug: "holiday-touchdown",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1746175",
      externalLink: "https://www.themoviedb.org/collection/1746175",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Holiday Touchdown",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
