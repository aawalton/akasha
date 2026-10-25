import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const francescaQuinnPi = {
  id: "01a1749a-66bd-7cb2-b0cc-4b9a5e1d8c86",
  type: "page-type/movie",
  slug: "francesca-quinn-pi",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1006315",
      externalLink: "https://www.themoviedb.org/movie/1006315",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Francesca Quinn, PI",
  genres: ["TV Movie", "Drama", "Crime", "Mystery"],
  imdbId: "tt21532904",
  posterPath: "/4Z1uaezAaQd1r8wUUepuh2jdVAE.jpg",
  voteAverage: 6.391,
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
