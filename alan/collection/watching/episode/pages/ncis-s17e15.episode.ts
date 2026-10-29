import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e15 = {
  id: "01a1884b-ef79-7058-b520-9ff9049058b0",
  type: "page-type/episode",
  slug: "ncis-s17e15",
  description:
    "The lead suspect in an NCIS murder investigation is a woman Gibbs' friend, Phillip Brooks, met on a dating site.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 15,
  publishedAt: "2020-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2160563",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/15",
    },
  ],
  title: "Lonely Hearts",
  episodeType: "standard",
  stillPath: "/sUHEvFDuVDN2r5tM3j2Ij4FYIl2.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
