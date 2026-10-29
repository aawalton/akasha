import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e09 = {
  id: "01a1884b-ef62-7704-9cea-a7b1e8f810bf",
  type: "page-type/episode",
  slug: "ncis-s01e09",
  description:
    "After a Marine widow receives a call from her dead husband, the NCIS team take on the case and have to exhume the body to deduce whether the call was a prank or not.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 9,
  publishedAt: "2003-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334438",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/9",
    },
  ],
  title: "Marine Down",
  episodeType: "mid-season",
  stillPath: "/g2zfehFrjJjXpp36W4njJ7GhBOT.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
