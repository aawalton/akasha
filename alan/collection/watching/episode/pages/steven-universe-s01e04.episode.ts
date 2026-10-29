import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e04 = {
  id: "01a18855-67e4-7a7b-a049-57026832985f",
  type: "page-type/episode",
  slug: "steven-universe-s01e04",
  description:
    "Steven's attempt to get the Gems to share his special breakfast tradition lands him on a journey through their ancient Gem temple.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 4,
  publishedAt: "2013-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003597",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/4",
    },
  ],
  title: "Together Breakfast",
  episodeType: "standard",
  stillPath: "/plIdF9rLKRd704jWZZFZr1IX1y1.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
