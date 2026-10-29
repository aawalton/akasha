import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS04e05 = {
  id: "01a18848-3733-7116-9946-c950ac13de9c",
  type: "page-type/episode",
  slug: "eureka-s04e05",
  description:
    "Claudia Donovan visits Eureka to see if Fargo's promises of wondrous devices are true, but she finds herself in the middle of a mystery suitable for Warehouse 13 when objects begin to appear randomly around the town and GD, and it must be solved before there are deadly consequences.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-4"],
  position: 5,
  publishedAt: "2010-08-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335273",
      externalLink: "https://www.themoviedb.org/tv/4620/season/4/episode/5",
    },
  ],
  title: "Crossing Over",
  episodeType: "standard",
  stillPath: "/oapCo6wSgXwYTG6Z3CxoO5HhXJk.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
