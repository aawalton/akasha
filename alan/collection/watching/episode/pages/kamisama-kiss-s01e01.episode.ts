import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kamisamaKissS01e01 = {
  id: "01a183d7-e8f3-7c02-8de7-0afcba50a2f9",
  type: "page-type/episode",
  slug: "kamisama-kiss-s01e01",
  description:
    "Abandoned by her father, Nanami finds herself homeless when she meets a man who offers his own home to her. His home turns out to be a shrine where his supernatural household awaits the return of their lord and master after a 20-year absence.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/kamisama-kiss-season-1"],
  position: 1,
  publishedAt: "2012-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1065123",
      externalLink: "https://www.themoviedb.org/tv/62741/season/1/episode/1",
    },
  ],
  title: "Nanami Becomes a God",
  episodeType: "standard",
  stillPath: "/4g40WqUrlL1zr4u5R8r25YeItv2.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:48:47.603Z",
  updatedAt: "2026-10-28T18:48:47.603Z",
} as const satisfies Episode
