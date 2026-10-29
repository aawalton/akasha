import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS02e16 = {
  id: "01a18854-82d1-7e5d-9593-71a1e1719f6f",
  type: "page-type/episode",
  slug: "stargate-atlantis-s02e16",
  description:
    "The team discovers two pods that contain the minds of alien beings, who take control of Weir and Sheppard's bodies to continue their personal war.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-2"],
  position: 16,
  publishedAt: "2006-01-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168486",
      externalLink: "https://www.themoviedb.org/tv/2290/season/2/episode/16",
    },
  ],
  title: "The Long Goodbye",
  episodeType: "standard",
  stillPath: "/s5AWdjLbWacnw9PwjZjA1syKoZO.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
