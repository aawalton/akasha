import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS01e07 = {
  id: "01a18854-2005-7d62-86d7-99c944f0a9aa",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s01e07",
  description:
    "As they traverse a decommisioned medical facility, the Batch encounter an unexpected threat.",
  ownLength: 29,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-1"],
  position: 7,
  publishedAt: "2021-06-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2923544",
      externalLink: "https://www.themoviedb.org/tv/105971/season/1/episode/7",
    },
  ],
  title: "Battle Scars",
  episodeType: "standard",
  stillPath: "/tV52HtfS1WKRw6PIsdkAVPtRvo4.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
