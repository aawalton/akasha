import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const echoS01e03 = {
  id: "01a18848-0cdb-7023-83b5-e94a06dae5d6",
  type: "page-type/episode",
  slug: "echo-s01e03",
  description:
    "Maya learns the meaning of collateral damage as Fisk's ruthless army arrives in Tamaha, Oklahoma.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/echo-miniseries"],
  position: 3,
  publishedAt: "2024-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4889378",
      externalLink: "https://www.themoviedb.org/tv/122226/season/1/episode/3",
    },
  ],
  title: "Tuklo",
  episodeType: "standard",
  stillPath: "/7Vhmfgbbvb4B9Op6G219phQ9l71.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:29:45.691Z",
  updatedAt: "2026-10-29T15:29:45.691Z",
} as const satisfies Episode
