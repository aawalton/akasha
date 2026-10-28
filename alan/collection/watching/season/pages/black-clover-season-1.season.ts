import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blackCloverSeason1 = {
  id: "01a183da-1968-7058-b38c-ec5f556cc324",
  type: "page-type/season",
  slug: "black-clover-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/black-clover"],
  position: 1,
  publishedAt: "2017-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "91272",
      externalLink: "https://www.themoviedb.org/tv/73223/season/1",
    },
  ],
  title: "Black Clover Season 1",
  posterPath: "/f77D5BapCT4n5mce7bFR8du09Hf.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-28T18:51:11.067Z",
  updatedAt: "2026-10-28T18:51:11.067Z",
} as const satisfies Season
