import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const homegrownChristmas = {
  id: "01a17499-e803-7f4c-befe-eb243a4b647e",
  type: "page-type/movie",
  slug: "homegrown-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550030",
      externalLink: "https://www.themoviedb.org/movie/550030",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Homegrown Christmas",
  genres: ["Drama", "TV Movie", "Romance"],
  imdbId: "tt9032562",
  posterPath: "/gLOWs1LyouP7ysSLUkDqMNGlYRb.jpg",
  voteAverage: 4.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
