import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const comeFlyWithMe = {
  id: "01a1749a-89a7-739d-8a60-1fefec7f1dce",
  type: "page-type/movie",
  slug: "come-fly-with-me",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2023-09-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1165403",
      externalLink: "https://www.themoviedb.org/movie/1165403",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Come Fly with Me",
  genres: ["TV Movie", "Drama", "Romance", "Family"],
  imdbId: "tt29081098",
  posterPath: "/vkVkKtUwV3r1KckIQAFFWVM316v.jpg",
  voteAverage: 7.4,
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
