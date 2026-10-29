import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS04e07 = {
  id: "01a18859-3c6a-73f5-83ce-9e6f89200311",
  type: "page-type/episode",
  slug: "torchwood-s04e07",
  description:
    "Gwen must fight to protect her family and takes a terrifying journey, covering both miles and decades, as the long history of the Miracle is revealed.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/miracle-day"],
  position: 7,
  publishedAt: "2011-08-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21616",
      externalLink: "https://www.themoviedb.org/tv/424/season/4/episode/7",
    },
  ],
  title: "Immortal Sins",
  episodeType: "standard",
  stillPath: "/apiDdfZaWTtEivf3nETMMYx0s68.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
