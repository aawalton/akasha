import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e08 = {
  id: "01a18854-82d1-712c-9b88-2d9845e037d2",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e08",
  description:
    "Rodney McKay is reunited with his estranged sister back on Earth, who has given up a brilliant career as a scientist to raise a family.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 8,
  publishedAt: "2006-09-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168506",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/8",
    },
  ],
  title: "McKay and Mrs. Miller",
  episodeType: "standard",
  stillPath: "/mAe8ewwdaTwUEDEqnDpMi40Ityt.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
