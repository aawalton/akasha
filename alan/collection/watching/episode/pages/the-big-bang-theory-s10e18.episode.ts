import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS10e18 = {
  id: "01a18856-4009-7a17-95a7-7b323e64ace3",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s10e18",
  description:
    "When Raj moves out of his apartment, Leonard and Penny offer him Sheldon's old room.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-10"],
  position: 18,
  publishedAt: "2017-03-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1279264",
      externalLink: "https://www.themoviedb.org/tv/1418/season/10/episode/18",
    },
  ],
  title: "The Escape Hatch Identification",
  episodeType: "standard",
  stillPath: "/8ttbTh5tFpDpviwpHfvTzhqB4rJ.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
