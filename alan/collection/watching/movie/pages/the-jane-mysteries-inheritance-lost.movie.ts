import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theJaneMysteriesInheritanceLost = {
  id: "01a1749a-89ab-711a-9270-b8237948aef0",
  type: "page-type/movie",
  slug: "the-jane-mysteries-inheritance-lost",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-jane-mysteries"],
  position: 0,
  publishedAt: "2023-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1106720",
      externalLink: "https://www.themoviedb.org/movie/1106720",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Jane Mysteries: Inheritance Lost",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt27199947",
  posterPath: "/zNOeqjt1mSEdTGB4dI7yw0CiRIZ.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
