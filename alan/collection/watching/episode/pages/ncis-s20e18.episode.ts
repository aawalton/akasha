import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e18 = {
  id: "01a1884b-ef82-762e-bbb3-d59834393dd1",
  type: "page-type/episode",
  slug: "ncis-s20e18",
  description:
    "The NCIS team digs deep to investigate a Navy Lieutenant who’s accused of trying to murder her husband but has no memory of the attack.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 18,
  publishedAt: "2023-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4291814",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/18",
    },
  ],
  title: "Head Games",
  episodeType: "standard",
  stillPath: "/qbzMzziFDJQDp7M92vjsyZplOBd.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
