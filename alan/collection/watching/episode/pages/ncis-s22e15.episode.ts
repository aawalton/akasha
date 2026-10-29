import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e15 = {
  id: "01a1884b-ef84-74c4-9c32-2e2ca44e7881",
  type: "page-type/episode",
  slug: "ncis-s22e15",
  description:
    "After a Navy Lieutenant's death reveals ties to Special Agent Sawyer, Torres and Knight uncover a murder linked to a wealthy family.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 15,
  publishedAt: "2025-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6017864",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/15",
    },
  ],
  title: "Moonlit",
  episodeType: "standard",
  stillPath: "/MXmM0wmIrRPRDf22v93rKXT3NP.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
