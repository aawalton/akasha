import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS02e11 = {
  id: "01a18854-82d1-7f54-9c1c-6f6c478b4ff0",
  type: "page-type/episode",
  slug: "stargate-atlantis-s02e11",
  description:
    "Colonel Sheppard and his team find themselves prisoners of the Wraith following Ford's attack on a hive ship. Dr. McKay goes to great lengths to help them.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-2"],
  position: 11,
  publishedAt: "2005-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168484",
      externalLink: "https://www.themoviedb.org/tv/2290/season/2/episode/11",
    },
  ],
  title: "The Hive (2)",
  episodeType: "standard",
  stillPath: "/xgXH2bAqe4RGWeprunLeNmW9ABH.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
