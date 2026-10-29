import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekTheNextGenerationSeason1 = {
  id: "01a06802-b8bd-701a-96ce-eece25355e3e",
  type: "page-type/season",
  slug: "star-trek-the-next-generation-season-1",
  title: "Star Trek: The Next Generation Season 1",
  partOfCollections: ["show/star-trek-the-next-generation"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "1987-09-29",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-the-next-generation/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
  progressedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Season
