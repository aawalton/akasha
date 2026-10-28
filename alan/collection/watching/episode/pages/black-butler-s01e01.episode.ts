import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackButlerS01e01 = {
  id: "01a183d8-99a5-7f2a-99a7-fdb71f1c7640",
  type: "page-type/episode",
  slug: "black-butler-s01e01",
  description:
    "The Phantomhive estate bustles with preparations for an important meeting between the Young Master and a slithering captain of industry. The maid, the gardener, and the cook are fools, but the Butler is a man of hidden talents.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-butler-season-1"],
  position: 1,
  publishedAt: "2008-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "919017",
      externalLink: "https://www.themoviedb.org/tv/50712/season/1/episode/1",
    },
  ],
  title: "His Butler, Able",
  episodeType: "standard",
  stillPath: "/6V9FLEgDKpBke3Yg43ANAxPkbO2.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Episode
