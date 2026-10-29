import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e06 = {
  id: "01a1884b-ef77-72e5-8ce6-95404c87a365",
  type: "page-type/episode",
  slug: "ncis-s16e06",
  description:
    "After NCIS arrives at a Halloween crime scene, Torres recognizes the victim as a friend from federal law enforcement training.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 6,
  publishedAt: "2018-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1598583",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/6",
    },
  ],
  title: "Beneath the Surface",
  episodeType: "standard",
  stillPath: "/aSCLTMw6D3Uz6miEkrmDEAySOkA.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
