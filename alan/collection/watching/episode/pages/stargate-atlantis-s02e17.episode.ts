import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS02e17 = {
  id: "01a18854-82d1-7489-beb0-a8196e96f771",
  type: "page-type/episode",
  slug: "stargate-atlantis-s02e17",
  description:
    "After a team from Atlantis goes missing, the expedition finds itself in the middle of a Genii coup.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-2"],
  position: 17,
  publishedAt: "2006-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168491",
      externalLink: "https://www.themoviedb.org/tv/2290/season/2/episode/17",
    },
  ],
  title: "Coup D'etat",
  episodeType: "standard",
  stillPath: "/aAVptPWLB4ALnFKEjLrT9upkDzD.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
