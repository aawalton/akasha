import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const iAmGrootS01e04 = {
  id: "01a1887e-c695-7d90-8f5b-8288b7b8b228",
  type: "page-type/episode",
  slug: "i-am-groot-s01e04",
  description:
    "Everybody needs some alone time to relax and wash up, but things go quite differently when you’re a Flora Colossi toddler.",
  ownLength: 6,
  ownProgress: 6,
  partOfCollections: ["season/i-am-groot-season-1"],
  position: 4,
  publishedAt: "2022-08-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4711228",
      externalLink: "https://www.themoviedb.org/tv/232125/season/1/episode/4",
    },
  ],
  title: "Groot Takes a Bath",
  episodeType: "standard",
  stillPath: "/stKeLppDBwscxoE9RXxNyrur27G.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T16:29:32.180Z",
  updatedAt: "2026-10-29T16:29:32.180Z",
} as const satisfies Episode
