import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveToTheRescue = {
  id: "01a17499-e804-7447-bc1c-f671c360339a",
  type: "page-type/movie",
  slug: "love-to-the-rescue",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-03-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "583724",
      externalLink: "https://www.themoviedb.org/movie/583724",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love to the Rescue",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt9759918",
  posterPath: "/c2SXJgVcFBGscbmmpwuUnrXtSMi.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "VIX ",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
