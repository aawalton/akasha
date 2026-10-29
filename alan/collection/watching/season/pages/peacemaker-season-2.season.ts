import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const peacemakerSeason2 = {
  id: "01a06802-b8bc-7010-9bf7-18aa6db6094d",
  type: "page-type/season",
  slug: "peacemaker-season-2",
  title: "Peacemaker Season 2",
  partOfCollections: ["show/peacemaker"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-08-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-426748",
      externalLink: "https://trakt.tv/shows/peacemaker-2022/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:39:36.852Z",
} as const satisfies Season
