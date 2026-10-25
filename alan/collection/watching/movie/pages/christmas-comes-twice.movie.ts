import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasComesTwice = {
  id: "01a1749a-2599-7c3c-8027-39b9d804255b",
  type: "page-type/movie",
  slug: "christmas-comes-twice",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "737782",
      externalLink: "https://www.themoviedb.org/movie/737782",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Comes Twice",
  genres: ["Romance", "TV Movie", "Comedy", "Fantasy"],
  imdbId: "tt13342004",
  posterPath: "/9VAhBkb2upTjXJP9kLgToXhpNVq.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
