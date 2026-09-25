import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const frankHerbertSChildrenOfDuneMiniseries = {
  id: "01a06802-b8ba-7000-894c-7c110a459db6",
  type: "page-type/season",
  slug: "frank-herbert-s-children-of-dune-miniseries",
  title: "Frank Herbert's Children of Dune Miniseries",
  partOfCollections: ["show/frank-herbert-s-children-of-dune"],
  position: 1,
  ownLength: 261,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-03-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-19588",
      externalLink: "https://trakt.tv/shows/frank-herbert-s-children-of-dune/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
