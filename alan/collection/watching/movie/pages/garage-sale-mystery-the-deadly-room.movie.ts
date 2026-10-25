import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteryTheDeadlyRoom = {
  id: "01a17499-8945-7b00-9d22-f14fa679deb6",
  type: "page-type/movie",
  slug: "garage-sale-mystery-the-deadly-room",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 2,
  publishedAt: "2015-04-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "325071",
      externalLink: "https://www.themoviedb.org/movie/325071",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mystery: The Deadly Room",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt4460190",
  posterPath: "/xANcH7loLZSJ7UIBgC8IOPLNDir.jpg",
  voteAverage: 6.264,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
