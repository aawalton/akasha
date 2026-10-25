import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const followingYonderStar = {
  id: "01a1749a-a94a-7de8-bdfa-842789ce8211",
  type: "page-type/movie",
  slug: "following-yonder-star",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1360794",
      externalLink: "https://www.themoviedb.org/movie/1360794",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Following Yonder Star",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt33903431",
  posterPath: "/tIX3upo5WdwH83SIVVV3NcKKza0.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
