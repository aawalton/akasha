import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const luckyInLove = {
  id: "01a17499-8947-7dad-821e-20fc1a1b6556",
  type: "page-type/movie",
  slug: "lucky-in-love",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2014-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "263627",
      externalLink: "https://www.themoviedb.org/movie/263627",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Lucky in Love",
  genres: ["Comedy", "Drama", "TV Movie"],
  imdbId: "tt3356654",
  posterPath: "/mv91QcucVwSSaHb1KNtlK04KQqK.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
