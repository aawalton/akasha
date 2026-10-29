import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS05e13 = {
  id: "01a18848-3735-7d1e-b123-5dbd7bfe942f",
  type: "page-type/episode",
  slug: "eureka-s05e13",
  description:
    "Wormholes randomly materialize around Eureka as the Department of Defense is set to shut the town.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-5"],
  position: 13,
  publishedAt: "2012-07-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335301",
      externalLink: "https://www.themoviedb.org/tv/4620/season/5/episode/13",
    },
  ],
  title: "Just Another Day...",
  episodeType: "finale",
  stillPath: "/qpjEiKMv1X7Zrk60D98qcrWSNBf.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
