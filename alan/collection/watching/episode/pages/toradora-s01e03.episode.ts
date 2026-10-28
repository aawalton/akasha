import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const toradoraS01e03 = {
  id: "01a183d9-26d6-7deb-b192-39cfabdf34d0",
  type: "page-type/episode",
  slug: "toradora-s01e03",
  description:
    "Ryūji and Taiga spend a day helping Minori at one of her many part-time jobs, and Ryūji gets to know her better when they're locked in a storehouse.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/toradora-season-1"],
  position: 3,
  publishedAt: "2008-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "883617",
      externalLink: "https://www.themoviedb.org/tv/42916/season/1/episode/3",
    },
  ],
  title: "Your Song",
  episodeType: "standard",
  stillPath: "/yUHFQpPrSVQgB6d9CnNeq6DJXbf.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-28T18:50:08.982Z",
  updatedAt: "2026-10-28T18:50:08.982Z",
} as const satisfies Episode
