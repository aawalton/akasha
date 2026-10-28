import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bocchiTheRockS01e03 = {
  id: "01a183d9-6b67-7dbc-97b2-9dce6484ecf8",
  type: "page-type/episode",
  slug: "bocchi-the-rock-s01e03",
  description:
    "Bocchi decides to try to pursue a new vocalist for the band: a classmate named Kita.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/bocchi-the-rock-season-1"],
  position: 3,
  publishedAt: "2022-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3989994",
      externalLink: "https://www.themoviedb.org/tv/119100/season/1/episode/3",
    },
  ],
  title: "Be Right There",
  episodeType: "standard",
  stillPath: "/rrPaFc6urB9cBNJfCrgNyTocnRj.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:50:26.535Z",
  updatedAt: "2026-10-28T18:50:26.535Z",
} as const satisfies Episode
