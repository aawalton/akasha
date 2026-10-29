import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e20 = {
  id: "01a1884b-ef78-776d-b04b-e9a5ba31070b",
  type: "page-type/episode",
  slug: "ncis-s16e20",
  description:
    "NCIS investigates the murder of a Marine Major believed to have been killed in the 9/11 attack on the Pentagon after human remains are discovered at a construction site.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 20,
  publishedAt: "2019-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1746836",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/20",
    },
  ],
  title: "Hail & Farewell",
  episodeType: "standard",
  stillPath: "/xoRKUGGs9LSxPHQdpgg2xJoOUGg.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
