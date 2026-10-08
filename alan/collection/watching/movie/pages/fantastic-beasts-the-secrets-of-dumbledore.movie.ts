import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fantasticBeastsTheSecretsOfDumbledore = {
  id: "01a06802-6d99-700e-8d92-99782a929ec1",
  type: "page-type/movie",
  slug: "fantastic-beasts-the-secrets-of-dumbledore",
  title: "Fantastic Beasts: The Secrets of Dumbledore",
  partOfCollections: ["show-collection/fantastic-beasts-movie-series"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2022-04-15",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/fantastic-beasts-the-secrets-of-dumbledore-2022",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
