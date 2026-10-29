import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS04e20 = {
  id: "01a18854-82d3-7ca1-8b56-98c5c958f26a",
  type: "page-type/episode",
  slug: "stargate-atlantis-s04e20",
  description:
    "Sheppard returns to Atlantis after a mission and finds the city abandoned, all systems dead -- and instead of ocean, sand dunes as far as the eye can see.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-4"],
  position: 20,
  publishedAt: "2008-03-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168544",
      externalLink: "https://www.themoviedb.org/tv/2290/season/4/episode/20",
    },
  ],
  title: "The Last Man (1)",
  episodeType: "finale",
  stillPath: "/a2Rnzd9cvY6fjCdHAnyTYRFGbVP.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
