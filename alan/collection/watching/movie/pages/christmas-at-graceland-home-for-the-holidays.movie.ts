import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasAtGracelandHomeForTheHolidays = {
  id: "01a17499-e801-7e2e-8e17-fe62ac12ebc5",
  type: "page-type/movie",
  slug: "christmas-at-graceland-home-for-the-holidays",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["franchise/at-graceland"],
  position: 2,
  publishedAt: "2019-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "627493",
      externalLink: "https://www.themoviedb.org/movie/627493",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas at Graceland: Home for the Holidays",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10768410",
  posterPath: "/ittuYKPaYAvmBP9AtWL4zDlN5Lm.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
