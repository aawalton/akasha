import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS01e02 = {
  id: "01a18848-3730-779f-b0f3-7a9a0160612a",
  type: "page-type/episode",
  slug: "eureka-s01e02",
  description:
    "The citizens of Eureka attend the funeral of Susan Perkins, only to find out that she is in fact alive. Meanwhile the Sheriff moves into an underground bunker that is actually a 'smart house' controlled by a computer dubbed 'S.A.R.A.H., and begins to investigate a 'ghost' that has been appearing in town.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-1"],
  position: 2,
  publishedAt: "2006-07-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335229",
      externalLink: "https://www.themoviedb.org/tv/4620/season/1/episode/2",
    },
  ],
  title: "Many Happy Returns",
  episodeType: "standard",
  stillPath: "/zx8Fln4uvT09e8mwAx8WOM6Nj2C.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
