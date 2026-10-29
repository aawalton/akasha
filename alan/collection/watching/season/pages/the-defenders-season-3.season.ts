import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theDefendersSeason3 = {
  id: "01a18856-c991-7cb9-ad6d-7855d0bf9352",
  type: "page-type/season",
  slug: "the-defenders-season-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/the-defenders"],
  position: 3,
  publishedAt: "1963-09-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21994",
      externalLink: "https://www.themoviedb.org/tv/11515/season/3",
    },
  ],
  title: "The Defenders Season 3",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Season
