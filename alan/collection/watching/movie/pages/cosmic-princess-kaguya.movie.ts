import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const cosmicPrincessKaguya = {
  id: "01a13bc8-1250-73bc-b594-d95ada4313e2",
  type: "page-type/movie",
  slug: "cosmic-princess-kaguya",
  title: "Cosmic Princess Kaguya!",
  ownLength: 143,
  ownProgress: 143,
  unit: "unit/minutes",
  status: "completed",
  completedAt: "2026-10-13",
  publishedAt: "2026-01-22",
  externalIdentity: [
    {
      source: "netflix",
      externalId: "81756595",
      externalLink: "https://www.netflix.com/title/81756595",
    },
  ],
  createdAt: "2026-10-14T18:58:50.064Z",
  updatedAt: "2026-10-14T18:58:50.064Z",
} as const satisfies Movie
