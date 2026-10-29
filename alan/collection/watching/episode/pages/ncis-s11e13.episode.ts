import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e13 = {
  id: "01a1884b-ef71-7c64-85bf-8d45bc6740c1",
  type: "page-type/episode",
  slug: "ncis-s11e13",
  description:
    "In an effort to find the terrorist Parsa, Gibbs and the NCIS team track down one of his cohorts using evidence from the drone attack.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 13,
  publishedAt: "2014-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "970474",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/13",
    },
  ],
  title: "Double Back",
  episodeType: "standard",
  stillPath: "/wscQB3tqmoNVjQ3RXkWYGPC5Gsy.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
