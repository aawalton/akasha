import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aHeidelbergHoliday = {
  id: "01a1749a-66bb-7aff-ab2b-a883d57aa4d4",
  type: "page-type/movie",
  slug: "a-heidelberg-holiday",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1074788",
      externalLink: "https://www.themoviedb.org/movie/1074788",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Heidelberg Holiday",
  genres: ["TV Movie", "Romance", "Family", "Drama"],
  imdbId: "tt29231347",
  posterPath: "/zSjUQ5EpOf4ytijx5X1bQefYfwp.jpg",
  voteAverage: 6.224,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
