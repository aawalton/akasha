import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasParade = {
  id: "01a17499-8949-739a-a1d6-cac21d49e3f7",
  type: "page-type/movie",
  slug: "the-christmas-parade",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2014-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "299591",
      externalLink: "https://www.themoviedb.org/movie/299591",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Parade",
  genres: ["Drama", "Family", "TV Movie"],
  imdbId: "tt4065324",
  posterPath: "/xbFcTozizElEXP9uAxtTXbQa8mn.jpg",
  voteAverage: 5.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
