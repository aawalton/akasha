import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aSprinkleOfDeceitAHannahSwensenMystery = {
  id: "01a1749a-a948-7834-aa27-7ec828131ef8",
  type: "page-type/movie",
  slug: "a-sprinkle-of-deceit-a-hannah-swensen-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/hannah-swensen-mysteries"],
  position: 9,
  publishedAt: "2024-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1353278",
      externalLink: "https://www.themoviedb.org/movie/1353278",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Sprinkle of Deceit: A Hannah Swensen Mystery",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt33063626",
  posterPath: "/zcnCtpViLDoUI5WXSXxQ4CBfnbi.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
