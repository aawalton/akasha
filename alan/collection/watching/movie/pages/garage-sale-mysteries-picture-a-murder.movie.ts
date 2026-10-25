import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteriesPictureAMurder = {
  id: "01a17499-e803-7ff2-8381-e4654d7f4bf3",
  type: "page-type/movie",
  slug: "garage-sale-mysteries-picture-a-murder",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 13,
  publishedAt: "2018-08-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "540573",
      externalLink: "https://www.themoviedb.org/movie/540573",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mysteries: Picture a Murder",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt8594624",
  posterPath: "/u5CGJsqZ3xBKIKr5nnWHgoLhVUl.jpg",
  voteAverage: 5.764,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
