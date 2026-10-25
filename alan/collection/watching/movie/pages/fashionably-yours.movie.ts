import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fashionablyYours = {
  id: "01a1749a-06bb-77ef-8d19-02924e0eb49a",
  type: "page-type/movie",
  slug: "fashionably-yours",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-04-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "677210",
      externalLink: "https://www.themoviedb.org/movie/677210",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Fashionably Yours",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt11808612",
  posterPath: "/r2CJ6ncw7PYe7UqjcDsMADrLTmn.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
