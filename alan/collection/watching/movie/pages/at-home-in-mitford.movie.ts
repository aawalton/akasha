import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const atHomeInMitford = {
  id: "01a17499-a7d3-720b-bfd7-af7d173425ad",
  type: "page-type/movie",
  slug: "at-home-in-mitford",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-08-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "469777",
      externalLink: "https://www.themoviedb.org/movie/469777",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "At Home in Mitford",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7140696",
  posterPath: "/pW5eMdfHbOZlPVXqrgYBmOBxEIK.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
