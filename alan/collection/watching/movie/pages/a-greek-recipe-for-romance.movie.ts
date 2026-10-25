import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aGreekRecipeForRomance = {
  id: "01a1749a-89a6-7f8f-98c0-a94c52d15fe7",
  type: "page-type/movie",
  slug: "a-greek-recipe-for-romance",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-06-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1285269",
      externalLink: "https://www.themoviedb.org/movie/1285269",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Greek Recipe for Romance",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt32269928",
  posterPath: "/7A6YG2Zs3vYv57Zeki6KjBcumFb.jpg",
  voteAverage: 7.2,
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
