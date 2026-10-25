import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myChristmasFamilyTree = {
  id: "01a1749a-259b-7f75-bec8-21657a02cddc",
  type: "page-type/movie",
  slug: "my-christmas-family-tree",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874194",
      externalLink: "https://www.themoviedb.org/movie/874194",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Christmas Family Tree",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt15508150",
  posterPath: "/nXnDMbSCKWQfH8WDkEc5kTbXZX8.jpg",
  voteAverage: 7.2,
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
