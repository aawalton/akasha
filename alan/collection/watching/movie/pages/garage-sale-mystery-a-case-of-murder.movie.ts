import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteryACaseOfMurder = {
  id: "01a17499-c95c-7a50-8ecf-a9b73b962bc5",
  type: "page-type/movie",
  slug: "garage-sale-mystery-a-case-of-murder",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 10,
  publishedAt: "2017-08-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "465294",
      externalLink: "https://www.themoviedb.org/movie/465294",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mystery: A Case of Murder",
  genres: ["Mystery", "Crime", "Drama", "TV Movie"],
  imdbId: "tt7235496",
  posterPath: "/pYkvJ83mMSjD6UeNriRrhVPnHkA.jpg",
  voteAverage: 6.84,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
