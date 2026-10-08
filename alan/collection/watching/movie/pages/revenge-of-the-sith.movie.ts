import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const revengeOfTheSith = {
  id: "01a06802-6d99-702e-b0e0-16a68e153cdf",
  type: "page-type/movie",
  slug: "revenge-of-the-sith",
  title: "Revenge of the Sith",
  partOfCollections: ["fandom/star-wars-2"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-05-19",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-wars-episode-iii-revenge-of-the-sith-2005",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
