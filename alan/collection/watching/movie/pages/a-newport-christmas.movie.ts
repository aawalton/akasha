import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aNewportChristmas = {
  id: "01a1749a-a948-76ee-bb24-2c58224d0eec",
  type: "page-type/movie",
  slug: "a-newport-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1537560",
      externalLink: "https://www.themoviedb.org/movie/1537560",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Newport Christmas",
  genres: ["Romance", "Fantasy", "TV Movie"],
  imdbId: "tt36491858",
  posterPath: "/bNWUsEOg7HzHlZmSTVKuZ6SglxM.jpg",
  voteAverage: 8.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
