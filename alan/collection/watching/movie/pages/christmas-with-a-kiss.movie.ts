import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasWithAKiss = {
  id: "01a1749a-66bd-7e01-a24d-30a384ea2726",
  type: "page-type/movie",
  slug: "christmas-with-a-kiss",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180746",
      externalLink: "https://www.themoviedb.org/movie/1180746",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas with a Kiss",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt29593706",
  posterPath: "/4r4XkceCXVVSKPiBIVyCBBoz2IH.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
