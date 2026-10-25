import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hitchedForTheHolidays = {
  id: "01a17499-669e-7a3b-9e76-2f78819c57a8",
  type: "page-type/movie",
  slug: "hitched-for-the-holidays",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2012-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "145840",
      externalLink: "https://www.themoviedb.org/movie/145840",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hitched for the Holidays",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt2256703",
  posterPath: "/33r8ThAUjm8YurFIJDcWEpZHQcV.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
