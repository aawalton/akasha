import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const weNeedALittleChristmas = {
  id: "01a1749a-66c2-78b8-89e5-52fbed7dfca0",
  type: "page-type/movie",
  slug: "we-need-a-little-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1027358",
      externalLink: "https://www.themoviedb.org/movie/1027358",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "We Need a Little Christmas",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt20258516",
  posterPath: "/n2TIUpxs4I9cfNOqVx8LVvg9qye.jpg",
  voteAverage: 6.2,
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
