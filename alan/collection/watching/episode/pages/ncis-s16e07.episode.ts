import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e07 = {
  id: "01a1884b-ef78-7fba-ab06-3798d652a6c1",
  type: "page-type/episode",
  slug: "ncis-s16e07",
  description:
    "After a mural by a street artist and activist is stolen, the NCIS investigation leads to a conspiracy regarding a Navy contractor and the safety of ocean mammals.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 7,
  publishedAt: "2018-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1608974",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/7",
    },
  ],
  title: "A Thousand Words",
  episodeType: "standard",
  stillPath: "/oKCd4Ln79jIRHFgFjf1isDM2aqk.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
