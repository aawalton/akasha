import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aTasteOfLove = {
  id: "01a1749a-89a6-77be-b617-170730b13850",
  type: "page-type/movie",
  slug: "a-taste-of-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-02-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1058727",
      externalLink: "https://www.themoviedb.org/movie/1058727",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Taste of Love",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt14476344",
  posterPath: "/uqxTrFaPJkxYqUpLGBwfzrgfE3M.jpg",
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
