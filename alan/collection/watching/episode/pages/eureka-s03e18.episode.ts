import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e18 = {
  id: "01a18848-3733-72d6-92a6-aa0993689834",
  type: "page-type/episode",
  slug: "eureka-s03e18",
  description:
    "Tess has a job offer from Australia, Zoe is prepared to leave for Harvard and Carter has a magnetic disturbance above Eureka to contend with, in the third season finale.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 18,
  publishedAt: "2009-09-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335269",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/18",
    },
  ],
  title: "What Goes Around Comes Around",
  episodeType: "finale",
  stillPath: "/xSIxUMWiAOKF3zSGQWl0g84yqMQ.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
