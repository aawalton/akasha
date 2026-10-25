import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const forLoveHoney = {
  id: "01a1749a-89a8-7afa-af9f-43a25bf3c61c",
  type: "page-type/movie",
  slug: "for-love-honey",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-06-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1285257",
      externalLink: "https://www.themoviedb.org/movie/1285257",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "For Love & Honey",
  genres: ["Drama", "Romance", "Comedy"],
  imdbId: "tt32333999",
  posterPath: "/gjPMaXRsQEOHAb8ni5ZnLtxWp2P.jpg",
  voteAverage: 5.8,
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
