import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS04e09 = {
  id: "01a18854-82d3-7efc-840e-7194b08316a2",
  type: "page-type/episode",
  slug: "stargate-atlantis-s04e09",
  description:
    "Rodney McKay goes in search of his sister on Earth after she is kidnapped by the head of a powerful corporation.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-4"],
  position: 9,
  publishedAt: "2007-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168531",
      externalLink: "https://www.themoviedb.org/tv/2290/season/4/episode/9",
    },
  ],
  title: "Miller's Crossing",
  episodeType: "standard",
  stillPath: "/eB42NJF1XRa24NRD7AUyJQIeozO.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
