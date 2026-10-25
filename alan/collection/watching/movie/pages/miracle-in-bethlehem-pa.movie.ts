import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const miracleInBethlehemPa = {
  id: "01a1749a-89a9-7ac8-af9a-71ca7f7c1ad6",
  type: "page-type/movie",
  slug: "miracle-in-bethlehem-pa",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-12-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180739",
      externalLink: "https://www.themoviedb.org/movie/1180739",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Miracle in Bethlehem, PA",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt29544283",
  posterPath: "/qVRehPn6mEWIL3HzEGF7SuiPHy7.jpg",
  voteAverage: 6.5,
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
