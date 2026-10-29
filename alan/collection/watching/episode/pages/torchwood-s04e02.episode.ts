import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS04e02 = {
  id: "01a18859-3c6a-7fcd-adae-002b3d284b84",
  type: "page-type/episode",
  slug: "torchwood-s04e02",
  description:
    "As the Torchwood team is reunited, Jack realizes he's the most vulnerable man on Earth. A flight to the United States turns into a desperate battle for survival.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/miracle-day"],
  position: 2,
  publishedAt: "2011-07-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21611",
      externalLink: "https://www.themoviedb.org/tv/424/season/4/episode/2",
    },
  ],
  title: "Rendition",
  episodeType: "standard",
  stillPath: "/jQIOwiLhCbyfTrqyi3OK14l3Dw7.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
