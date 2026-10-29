import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theDefendersSeason2 = {
  id: "01a18856-c991-7259-9d36-906912ae1f1f",
  type: "page-type/season",
  slug: "the-defenders-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/the-defenders"],
  position: 2,
  publishedAt: "1962-09-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21995",
      externalLink: "https://www.themoviedb.org/tv/11515/season/2",
    },
  ],
  title: "The Defenders Season 2",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Season
