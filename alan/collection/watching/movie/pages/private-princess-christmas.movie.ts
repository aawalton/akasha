import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const privatePrincessChristmas = {
  id: "01a1749a-89aa-731c-a751-7bcec76591bf",
  type: "page-type/movie",
  slug: "private-princess-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361220",
      externalLink: "https://www.themoviedb.org/movie/1361220",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Private Princess Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt33400340",
  posterPath: "/14F9kahwbbDJCFAgh0v2GtzfjVo.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
