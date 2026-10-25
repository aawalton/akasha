import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hauntedHarmonyMysteriesKeyToTheCastle = {
  id: "01a1749a-c869-7ac2-b62a-30b1e9c57962",
  type: "page-type/movie",
  slug: "haunted-harmony-mysteries-key-to-the-castle",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/haunted-harmony-mysteries"],
  position: 3,
  publishedAt: "2026-05-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1663525",
      externalLink: "https://www.themoviedb.org/movie/1663525",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Haunted Harmony Mysteries: Key to the Castle",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt41435072",
  posterPath: "/l9Pm8DnilY7A1POSOacy1JEYE5Y.jpg",
  voteAverage: 9.25,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T20:45:31.132Z",
} as const satisfies Movie
