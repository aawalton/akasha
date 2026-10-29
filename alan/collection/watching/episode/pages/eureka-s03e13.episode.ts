import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e13 = {
  id: "01a18848-3732-7cd1-9798-9a4daef28bed",
  type: "page-type/episode",
  slug: "eureka-s03e13",
  description:
    "Eureka's teenagers who appear to have been manipulated while asleep, gathered in a field where they assembled a strange structure comprised of scrap metal and electronics.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 13,
  publishedAt: "2009-08-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335264",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/13",
    },
  ],
  title: "If You Build It...",
  episodeType: "standard",
  stillPath: "/AuCoZkPeLcx2M5xDeVQX6AFdL3D.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
