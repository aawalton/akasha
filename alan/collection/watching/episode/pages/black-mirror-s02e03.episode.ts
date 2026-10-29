import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS02e03 = {
  id: "01a18843-982a-7ced-8f4c-696c57e295bb",
  type: "page-type/episode",
  slug: "black-mirror-s02e03",
  description:
    "A failed comedian who voices a popular cartoon bear named Waldo finds himself mixing in politics when TV executives want Waldo to run for office.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-2"],
  position: 3,
  publishedAt: "2013-02-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "877839",
      externalLink: "https://www.themoviedb.org/tv/42009/season/2/episode/3",
    },
  ],
  title: "The Waldo Moment",
  episodeType: "mid-season",
  stillPath: "/hSEwesgbIQWoMucQdc55c4qaAQM.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
