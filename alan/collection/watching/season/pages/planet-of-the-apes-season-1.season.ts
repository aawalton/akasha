import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const planetOfTheApesSeason1 = {
  id: "01a06802-b8bc-701a-9495-144b44b0c817",
  type: "page-type/season",
  slug: "planet-of-the-apes-season-1",
  title: "Planet of the Apes Season 1",
  partOfCollections: ["show/planet-of-the-apes-1974"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1974-09-14",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-38",
      externalLink: "https://trakt.tv/shows/planet-of-the-apes/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:23:44.813Z",
} as const satisfies Season
