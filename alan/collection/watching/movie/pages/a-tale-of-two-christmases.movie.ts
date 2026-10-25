import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aTaleOfTwoChristmases = {
  id: "01a1749a-4649-73bc-81e3-0ac63e9736c0",
  type: "page-type/movie",
  slug: "a-tale-of-two-christmases",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028546",
      externalLink: "https://www.themoviedb.org/movie/1028546",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Tale of Two Christmases",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22247650",
  posterPath: "/2UlaSWJNZivax806OOCiY4x5jGS.jpg",
  voteAverage: 5.635,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
