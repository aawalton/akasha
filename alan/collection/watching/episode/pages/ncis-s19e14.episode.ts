import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e14 = {
  id: "01a1884b-ef7d-71c7-a786-71f9345d97bf",
  type: "page-type/episode",
  slug: "ncis-s19e14",
  description:
    "As NCIS investigates the cause of death of a reservist Navy SEAL surgeon, they're forced to bring Vance's daughter to help with a highly dangerous mission.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 14,
  publishedAt: "2022-03-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3248858",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/14",
    },
  ],
  title: "First Steps",
  episodeType: "standard",
  stillPath: "/9RpMSoGHlAIVrX0ytdcVy1j1km1.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
