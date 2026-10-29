import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS01e09 = {
  id: "01a18848-3731-7ad0-8446-36e57eeaa665",
  type: "page-type/episode",
  slug: "eureka-s01e09",
  description:
    "Taggart achieves a medical breakthrough while Fargo invents a device that bridges the divide between computers and human brains.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-1"],
  position: 9,
  publishedAt: "2006-09-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335236",
      externalLink: "https://www.themoviedb.org/tv/4620/season/1/episode/9",
    },
  ],
  title: "Primal",
  episodeType: "standard",
  stillPath: "/Ahl3u0Xj2y6NCKfIfenLiGe9OPV.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
