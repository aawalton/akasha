import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteriesThePandoraSBoxMurders = {
  id: "01a17499-e803-7203-8f88-84333d74db27",
  type: "page-type/movie",
  slug: "garage-sale-mysteries-the-pandora-s-box-murders",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 11,
  publishedAt: "2018-08-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "539960",
      externalLink: "https://www.themoviedb.org/movie/539960",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mysteries: The Pandora's Box Murders",
  genres: ["Drama", "Mystery", "TV Movie"],
  imdbId: "tt8045978",
  posterPath: "/u3DLSmacKglq6qfhI2s8Yq3I00Y.jpg",
  voteAverage: 7.029,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
