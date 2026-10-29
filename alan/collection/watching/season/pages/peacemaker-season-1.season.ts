import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const peacemakerSeason1 = {
  id: "01a06802-b8bc-700f-ab18-270629544386",
  type: "page-type/season",
  slug: "peacemaker-season-1",
  title: "Peacemaker Season 1",
  partOfCollections: ["show/peacemaker"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-10-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-32305",
      externalLink: "https://trakt.tv/shows/peacemaker/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:39:36.852Z",
} as const satisfies Season
