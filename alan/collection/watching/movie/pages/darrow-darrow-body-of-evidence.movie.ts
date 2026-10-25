import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const darrowDarrowBodyOfEvidence = {
  id: "01a17499-e802-7d80-9ff3-1b0bb9434cf2",
  type: "page-type/movie",
  slug: "darrow-darrow-body-of-evidence",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/darrow-darrow"],
  position: 3,
  publishedAt: "2018-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "553252",
      externalLink: "https://www.themoviedb.org/movie/553252",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Darrow & Darrow: Body of Evidence",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt8710040",
  posterPath: "/nwl7xvAO4wbGDTSmtAL7h6OmfU9.jpg",
  voteAverage: 7.3,
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
