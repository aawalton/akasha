import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS01e10 = {
  id: "01a18854-82d0-78d7-ae11-3a6af5fa2526",
  type: "page-type/episode",
  slug: "stargate-atlantis-s01e10",
  description:
    "When a massive storm threatens the city, Atlantis is evacuated, only to be taken over by the team's newest enemy.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-1"],
  position: 10,
  publishedAt: "2004-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168452",
      externalLink: "https://www.themoviedb.org/tv/2290/season/1/episode/10",
    },
  ],
  title: "The Storm (1)",
  episodeType: "standard",
  stillPath: "/l2GwHYP9okEuE2HMkWf0cilMva9.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
