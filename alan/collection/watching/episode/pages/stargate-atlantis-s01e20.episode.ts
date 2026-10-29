import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS01e20 = {
  id: "01a18854-82d0-74a9-b6ad-331084a9f37b",
  type: "page-type/episode",
  slug: "stargate-atlantis-s01e20",
  description:
    "All hope seems lost, until Colonel Everett arrives suddenly from Earth. He is determined to defend the city until the arrival of a ZPM, brought by a new ship.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-1"],
  position: 20,
  publishedAt: "2005-01-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "970508",
      externalLink: "https://www.themoviedb.org/tv/2290/season/1/episode/20",
    },
  ],
  title: "The Siege (2)",
  episodeType: "finale",
  stillPath: "/6T75Toeth1S8dZmJDtizpaWRqkx.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
