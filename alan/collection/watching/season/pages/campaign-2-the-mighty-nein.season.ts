import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const campaign2TheMightyNein = {
  id: "01a06802-b8b8-7020-bdb4-51a0c5263b10",
  type: "page-type/season",
  slug: "campaign-2-the-mighty-nein",
  title: "Campaign 2: The Mighty Nein",
  partOfCollections: ["show/critical-role"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-01-12",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-121261",
      externalLink: "https://trakt.tv/shows/critical-role/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:26:56.472Z",
} as const satisfies Season
