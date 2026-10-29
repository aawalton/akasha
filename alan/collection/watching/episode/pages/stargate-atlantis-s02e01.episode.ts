import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS02e01 = {
  id: "01a18854-82d0-7f6d-bb95-3e1a406ea6ab",
  type: "page-type/episode",
  slug: "stargate-atlantis-s02e01",
  description:
    "The Daedalus arrives to defend Atlantis from the Wraith onslaught, but it may not be enough when the team discovers that an even larger armada is on the way.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-2"],
  position: 1,
  publishedAt: "2005-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168476",
      externalLink: "https://www.themoviedb.org/tv/2290/season/2/episode/1",
    },
  ],
  title: "The Siege (3)",
  episodeType: "standard",
  stillPath: "/xtXwUHZrGfRuJ3pSPtfmnzizcrt.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
