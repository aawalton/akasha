import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const dragonBallSeason1 = {
  id: "01a183db-f2a2-7e4c-a655-e7f6e0a93e75",
  type: "page-type/season",
  slug: "dragon-ball-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/dragon-ball"],
  position: 1,
  publishedAt: "1986-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "23501",
      externalLink: "https://www.themoviedb.org/tv/12609/season/1",
    },
  ],
  title: "Dragon Ball Season 1",
  posterPath: "/yWS3bmJ8jsuDKtqh7omBaijSO9h.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:53:12.214Z",
  updatedAt: "2026-10-28T18:53:12.214Z",
} as const satisfies Season
