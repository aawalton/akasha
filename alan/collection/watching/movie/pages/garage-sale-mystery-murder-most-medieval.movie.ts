import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteryMurderMostMedieval = {
  id: "01a17499-c95c-7790-9e29-b5257c2e203a",
  type: "page-type/movie",
  slug: "garage-sale-mystery-murder-most-medieval",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 10,
  publishedAt: "2017-08-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "465291",
      externalLink: "https://www.themoviedb.org/movie/465291",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mystery: Murder Most Medieval",
  genres: ["Mystery", "TV Movie", "Crime", "Drama"],
  imdbId: "tt7197596",
  posterPath: "/4YSmuA1ycwvgMtp6zISZU7jhlj7.jpg",
  voteAverage: 5.861,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T20:45:07.643Z",
} as const satisfies Movie
