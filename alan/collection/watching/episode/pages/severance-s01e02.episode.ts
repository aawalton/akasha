import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const severanceS01e02 = {
  id: "01a1887f-8746-7992-92b8-4df69b221fa0",
  type: "page-type/episode",
  slug: "severance-s01e02",
  description:
    "The team train new hire Helly on macrodata refinement. Mark takes a day off to meet with a mysterious former colleague.",
  ownLength: 57,
  ownProgress: 57,
  partOfCollections: ["season/severance-season-1"],
  position: 2,
  publishedAt: "2022-02-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3396429",
      externalLink: "https://www.themoviedb.org/tv/95396/season/1/episode/2",
    },
  ],
  title: "Half Loop",
  episodeType: "standard",
  stillPath: "/wIQP0P2tyE7VRIN3xR8Efq7UgKt.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T16:30:21.510Z",
  updatedAt: "2026-10-29T16:30:21.510Z",
} as const satisfies Episode
