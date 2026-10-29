import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const campaign4 = {
  id: "01a06802-b8b8-7022-b871-d10ce8fc5003",
  type: "page-type/season",
  slug: "campaign-4",
  title: "Campaign 4",
  partOfCollections: ["show/critical-role"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-10-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-477848",
      externalLink: "https://trakt.tv/shows/critical-role/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:26:56.472Z",
} as const satisfies Season
