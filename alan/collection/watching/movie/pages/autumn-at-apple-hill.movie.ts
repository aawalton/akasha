import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const autumnAtAppleHill = {
  id: "01a1749a-89a7-7969-9bb5-93d996d4437c",
  type: "page-type/movie",
  slug: "autumn-at-apple-hill",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1325870",
      externalLink: "https://www.themoviedb.org/movie/1325870",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Autumn at Apple Hill",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt33060158",
  posterPath: "/yNHN88QVgFWC1lMoqXqrHyeCAXK.jpg",
  voteAverage: 8.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
