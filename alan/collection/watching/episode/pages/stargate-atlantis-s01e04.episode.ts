import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS01e04 = {
  id: "01a18854-82cf-7dc3-9be2-2a3ebd0057e9",
  type: "page-type/episode",
  slug: "stargate-atlantis-s01e04",
  description:
    "The team finds themselves in mortal danger when their Puddle Jumper ship becomes lodged in the Stargate.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-1"],
  position: 4,
  publishedAt: "2004-07-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168448",
      externalLink: "https://www.themoviedb.org/tv/2290/season/1/episode/4",
    },
  ],
  title: "Thirty Eight Minutes",
  episodeType: "standard",
  stillPath: "/3MBBKpJ3qEabTF0TskMEHvcdsk4.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
