import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS04e13 = {
  id: "01a18852-a9f8-7025-b310-c5af14d3a54f",
  type: "page-type/episode",
  slug: "star-trek-discovery-s04e13",
  description:
    "The DMA approaches Earth and Ni’Var. With evacuations underway, Burnham and the team aboard the U.S.S. Discovery must find a way to communicate and connect with a species far different from their own before time runs out.",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-4"],
  position: 13,
  publishedAt: "2022-03-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3587355",
      externalLink: "https://www.themoviedb.org/tv/67198/season/4/episode/13",
    },
  ],
  title: "Coming Home",
  episodeType: "finale",
  stillPath: "/8aqDSsMHFPReRhzwTcFmXBGQ2A2.jpg",
  voteAverage: 5.6,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
