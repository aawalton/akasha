import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const checkInnToChristmas = {
  id: "01a17499-e801-75f7-8acf-355bcbc84345",
  type: "page-type/movie",
  slug: "check-inn-to-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "630915",
      externalLink: "https://www.themoviedb.org/movie/630915",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Check Inn to Christmas",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt10768312",
  posterPath: "/fBf66qLun33OVdzjSOnQYJNWP1r.jpg",
  voteAverage: 6.7,
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
