import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS01e01 = {
  id: "01a18854-82cf-748d-83b0-290ac6ae3333",
  type: "page-type/episode",
  slug: "stargate-atlantis-s01e01",
  description:
    "A new Stargate team embarks on a dangerous mission to a distant galaxy, where they discover a mythical lost city -- and a deadly new enemy.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-1"],
  position: 1,
  publishedAt: "2004-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168437",
      externalLink: "https://www.themoviedb.org/tv/2290/season/1/episode/1",
    },
  ],
  title: "Rising (1)",
  episodeType: "standard",
  stillPath: "/9VY06DH7RbPaZdyRd3OKQCpDYve.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
