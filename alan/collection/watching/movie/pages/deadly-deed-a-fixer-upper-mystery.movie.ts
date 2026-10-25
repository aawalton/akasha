import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const deadlyDeedAFixerUpperMystery = {
  id: "01a17499-e802-7331-9094-edd8cc040fe2",
  type: "page-type/movie",
  slug: "deadly-deed-a-fixer-upper-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/fixer-upper-mysteries"],
  position: 3,
  publishedAt: "2018-03-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "506460",
      externalLink: "https://www.themoviedb.org/movie/506460",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Deadly Deed: A Fixer Upper Mystery",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt8049772",
  posterPath: "/hzUD1QyQhB2wuonKRPSWBlCwh7a.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T20:45:10.655Z",
} as const satisfies Movie
