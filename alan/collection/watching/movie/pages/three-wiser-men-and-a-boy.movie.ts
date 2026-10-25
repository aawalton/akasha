import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const threeWiserMenAndABoy = {
  id: "01a1749a-89ac-7d3d-b6bd-38f930383e72",
  type: "page-type/movie",
  slug: "three-wiser-men-and-a-boy",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1293279",
      externalLink: "https://www.themoviedb.org/movie/1293279",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Three Wiser Men and a Boy",
  genres: ["TV Movie", "Comedy", "Drama"],
  imdbId: "tt32306650",
  posterPath: "/dis4s7NxEFigKawVNgQvkd48c1x.jpg",
  voteAverage: 7.152,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
