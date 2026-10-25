import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myChristmasLove = {
  id: "01a17499-a7d6-7019-9d0d-10902179ab8f",
  type: "page-type/movie",
  slug: "my-christmas-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421625",
      externalLink: "https://www.themoviedb.org/movie/421625",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Christmas Love",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt6104760",
  posterPath: "/o04ju703cCPxObouQqKBtmkBWWR.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
