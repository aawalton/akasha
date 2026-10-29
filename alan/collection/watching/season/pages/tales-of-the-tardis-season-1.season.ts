import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const talesOfTheTardisSeason1 = {
  id: "01a06802-b8be-7033-a6f6-f247066d7cf5",
  type: "page-type/season",
  slug: "tales-of-the-tardis-season-1",
  title: "Tales of the Tardis Season 1",
  partOfCollections: ["show/tales-of-the-tardis"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-11-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-339622",
      externalLink: "https://trakt.tv/shows/tales-of-the-tardis/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:49.285Z",
} as const satisfies Season
