import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e11 = {
  id: "01a1884b-ef6e-7eee-914d-05f8179d690c",
  type: "page-type/episode",
  slug: "ncis-s09e11",
  description:
    "When a Navy Captain is killed in a hotel room, NCIS must track down and protect his very pregnant companion from unknown assailants.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 11,
  publishedAt: "2011-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334599",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/11",
    },
  ],
  title: "Newborn King",
  episodeType: "mid-season",
  stillPath: "/uO2Rl15jWlSx3XgXCdDP0xc2DLH.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
