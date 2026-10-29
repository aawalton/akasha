import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS04e14 = {
  id: "01a18848-3733-713c-bdce-efe94a534735",
  type: "page-type/episode",
  slug: "eureka-s04e14",
  description:
    "Jack deals with a bank robbery which may relate to the sudden gravity issues besetting the citizens of Eureka. Meanwhile, Fargo's rivalry with Isaac Parrish is boosted when he learns Holly and Parrish went on a date.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-4"],
  position: 14,
  publishedAt: "2011-08-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335284",
      externalLink: "https://www.themoviedb.org/tv/4620/season/4/episode/14",
    },
  ],
  title: "Up in the Air",
  episodeType: "standard",
  stillPath: "/iWdNvK2OSiGIoDe80uSqHjcDMDR.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
