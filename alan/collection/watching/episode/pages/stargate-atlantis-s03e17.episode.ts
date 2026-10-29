import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e17 = {
  id: "01a18854-82d2-7274-8d32-4224100ffac8",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e17",
  description:
    "The team tries to relax during a mandatory day off, until an explosion leaves three people dead -- and reveals that one scientist is a walking time bomb.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 17,
  publishedAt: "2007-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168517",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/17",
    },
  ],
  title: "Sunday",
  episodeType: "standard",
  stillPath: "/kJJ0z5sERgFZEfpd1GHwtkCnkFx.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
