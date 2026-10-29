import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS05e05 = {
  id: "01a18848-3734-75a1-9201-9786f01ddc23",
  type: "page-type/episode",
  slug: "eureka-s05e05",
  description: "The crew moves forward after an ordeal and Warren's visit adds to the pressure.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-5"],
  position: 5,
  publishedAt: "2012-05-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335294",
      externalLink: "https://www.themoviedb.org/tv/4620/season/5/episode/5",
    },
  ],
  title: "Jack of All Trades",
  episodeType: "standard",
  stillPath: "/hsyZccmEOG1vhzbeD0k9F5S5XmX.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
