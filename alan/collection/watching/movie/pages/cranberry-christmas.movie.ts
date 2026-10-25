import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const cranberryChristmas = {
  id: "01a1749a-259a-7f0a-8e60-d34abe478f47",
  type: "page-type/movie",
  slug: "cranberry-christmas",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-10-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "737795",
      externalLink: "https://www.themoviedb.org/movie/737795",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Cranberry Christmas",
  genres: ["Romance", "TV Movie", "Comedy", "Drama"],
  imdbId: "tt13356044",
  posterPath: "/dUCDnRJAThDXofa7CCrQX1SPo0Q.jpg",
  voteAverage: 6.676,
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
