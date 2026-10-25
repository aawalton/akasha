import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const gourmetDetective = {
  id: "01a17499-8945-70f6-a034-840abe59b399",
  type: "page-type/movie",
  slug: "gourmet-detective",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/gourmet-detective"],
  position: 0,
  publishedAt: "2015-05-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "330161",
      externalLink: "https://www.themoviedb.org/movie/330161",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Gourmet Detective",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt3600960",
  posterPath: "/9eLeSmEcBQOv6hkl5tXx14Q60ed.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
