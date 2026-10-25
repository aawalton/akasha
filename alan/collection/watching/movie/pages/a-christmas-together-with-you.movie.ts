import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasTogetherWithYou = {
  id: "01a1749a-2598-736e-bb50-9ae08e560770",
  type: "page-type/movie",
  slug: "a-christmas-together-with-you",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "876103",
      externalLink: "https://www.themoviedb.org/movie/876103",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Christmas Together with You",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt15420960",
  posterPath: "/bDlKgyTZtd5T7sZidwndSxUAjgY.jpg",
  voteAverage: 6.1,
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
