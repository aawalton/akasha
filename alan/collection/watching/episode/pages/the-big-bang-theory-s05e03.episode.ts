import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS05e03 = {
  id: "01a18856-4002-7c5f-bc58-f39fd9c94d4c",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s05e03",
  description:
    "Leonard and Amy get to know each other better, while Howard and Bernadette spend the weekend with Mrs. Wolowitz.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-5"],
  position: 3,
  publishedAt: "2011-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64721",
      externalLink: "https://www.themoviedb.org/tv/1418/season/5/episode/3",
    },
  ],
  title: "The Pulled Groin Extrapolation",
  episodeType: "standard",
  stillPath: "/wEdMYpz2tWAmp626nAWq0l44ltA.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
