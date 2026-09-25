import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const spiderManNoWayHome = {
  id: "01a06802-6d99-7038-baa4-68d0f1d23004",
  type: "page-type/movie",
  slug: "spider-man-no-way-home",
  title: "Spider-Man: No Way Home",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 27,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-12-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/spider-man-no-way-home-2021",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
