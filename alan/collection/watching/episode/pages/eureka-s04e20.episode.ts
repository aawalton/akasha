import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS04e20 = {
  id: "01a18848-3734-74d0-81d4-9d1e5d44ab78",
  type: "page-type/episode",
  slug: "eureka-s04e20",
  description:
    "In the season finale - It's chaos in Eureka when an energy beam rips through main street but the Astraeus launch must go on...with or without Eureka intact.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-4"],
  position: 20,
  publishedAt: "2011-09-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335290",
      externalLink: "https://www.themoviedb.org/tv/4620/season/4/episode/20",
    },
  ],
  title: "One Giant Leap...",
  episodeType: "standard",
  stillPath: "/Au3chixERy4XAdq4joS4O6TVSXT.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
