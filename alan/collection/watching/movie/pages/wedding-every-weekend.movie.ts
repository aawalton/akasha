import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const weddingEveryWeekend = {
  id: "01a1749a-06bf-7f7a-9e7e-562cb336bfa9",
  type: "page-type/movie",
  slug: "wedding-every-weekend",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-08-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "725854",
      externalLink: "https://www.themoviedb.org/movie/725854",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Wedding Every Weekend",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt12660882",
  posterPath: "/p4SuUiPEtsk61VNVKpO8ayF9M4A.jpg",
  voteAverage: 6.6,
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
