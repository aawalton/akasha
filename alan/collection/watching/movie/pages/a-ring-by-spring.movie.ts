import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aRingBySpring = {
  id: "01a17499-8943-75ed-b8c5-b0afcada8199",
  type: "page-type/movie",
  slug: "a-ring-by-spring",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2014-03-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "258691",
      externalLink: "https://www.themoviedb.org/movie/258691",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Ring by Spring",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt3346986",
  posterPath: "/7478Jii76rD3Izbeb8jsezelOzf.jpg",
  voteAverage: 5.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
