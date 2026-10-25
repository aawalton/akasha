import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteryGuiltyUntilProvenInnocent = {
  id: "01a17499-a7d4-7812-be70-fb6666c09f68",
  type: "page-type/movie",
  slug: "garage-sale-mystery-guilty-until-proven-innocent",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 4,
  publishedAt: "2016-01-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "371182",
      externalLink: "https://www.themoviedb.org/movie/371182",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mystery: Guilty Until Proven Innocent",
  genres: ["Drama", "Mystery", "TV Movie"],
  imdbId: "tt5135532",
  posterPath: "/rcTCWsFNW7OM67WLvPKUOf3Kq1e.jpg",
  voteAverage: 6.28,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
