import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGoodWitchSWonder = {
  id: "01a17499-8949-71a2-9ebe-3bd6768e6e74",
  type: "page-type/movie",
  slug: "the-good-witch-s-wonder",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-good-witch"],
  position: 7,
  publishedAt: "2014-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "638187",
      externalLink: "https://www.themoviedb.org/movie/638187",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Good_Witch's_Wonder" },
  ],
  title: "The Good Witch's Wonder",
  genres: ["Fantasy", "Family", "Mystery", "TV Movie"],
  imdbId: "tt3197176",
  posterPath: "/7GzNpgKAHfQOi4xrB7NFUfnsVZe.jpg",
  voteAverage: 7.415,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T20:45:01.766Z",
} as const satisfies Movie
