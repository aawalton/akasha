import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theDefendersSeason4 = {
  id: "01a18856-c991-7d87-baf1-9ff55e98da56",
  type: "page-type/season",
  slug: "the-defenders-season-4",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/the-defenders"],
  position: 4,
  publishedAt: "1964-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21993",
      externalLink: "https://www.themoviedb.org/tv/11515/season/4",
    },
  ],
  title: "The Defenders Season 4",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Season
