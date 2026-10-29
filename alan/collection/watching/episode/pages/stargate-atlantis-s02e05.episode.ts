import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS02e05 = {
  id: "01a18854-82d0-7c07-bb7c-131501a482f9",
  type: "page-type/episode",
  slug: "stargate-atlantis-s02e05",
  description:
    "The Atlantis team finds a culture that lives in relative safety from the Wraith, because they hand over their criminals to the Wraith -- and crash-land in the volatile penal colony.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-2"],
  position: 5,
  publishedAt: "2005-08-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168478",
      externalLink: "https://www.themoviedb.org/tv/2290/season/2/episode/5",
    },
  ],
  title: "Condemned",
  episodeType: "standard",
  stillPath: "/lkMnGprdyQKsaecCGXUylC8Gy1q.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
