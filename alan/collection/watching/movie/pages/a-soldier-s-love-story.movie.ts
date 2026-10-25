import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aSoldierSLoveStory = {
  id: "01a17499-470a-7356-ab76-d5a7ca38a7d1",
  type: "page-type/movie",
  slug: "a-soldier-s-love-story",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "52635",
      externalLink: "https://www.themoviedb.org/movie/52635",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Soldier's Love Story",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt1579306",
  posterPath: "/iqttzl9f5eXiD3qMAOM4ylVbqTv.jpg",
  voteAverage: 6,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
