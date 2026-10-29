import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS01e10 = {
  id: "01a18848-3731-7dd7-b801-bbffe104cad6",
  type: "page-type/episode",
  slug: "eureka-s01e10",
  description:
    "Strange behavior exhibited by the townspeople is investigated by Carter, who has to solve the mystery before Stark makes a decision that could affect the world.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-1"],
  position: 10,
  publishedAt: "2006-09-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335237",
      externalLink: "https://www.themoviedb.org/tv/4620/season/1/episode/10",
    },
  ],
  title: "Purple Haze",
  episodeType: "standard",
  stillPath: "/3o22TnfOemU3msaTqhOu1PEN9dr.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
