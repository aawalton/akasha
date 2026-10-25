import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGoodWitchSGarden = {
  id: "01a17499-470e-728a-940b-410547ed7479",
  type: "page-type/movie",
  slug: "the-good-witch-s-garden",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/the-good-witch"],
  position: 2,
  publishedAt: "2009-02-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "60821",
      externalLink: "https://www.themoviedb.org/movie/60821",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Good_Witch's_Garden" },
  ],
  title: "The Good Witch's Garden",
  genres: ["TV Movie", "Comedy", "Family", "Fantasy", "Romance"],
  imdbId: "tt1312251",
  posterPath: "/XMRMsKAKvA5reGZIL4m3YqQwQv.jpg",
  voteAverage: 7.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T20:44:55.748Z",
} as const satisfies Movie
