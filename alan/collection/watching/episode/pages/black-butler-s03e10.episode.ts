import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackButlerS03e10 = {
  id: "01a183d8-99a7-7dbf-9cf1-6a69a74aa3d9",
  type: "page-type/episode",
  slug: "black-butler-s03e10",
  description:
    "Sebastian carries out his remaining orders, and as usual, Will is left to clean up the mess.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-butler-season-3"],
  position: 10,
  publishedAt: "2014-09-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "997395",
      externalLink: "https://www.themoviedb.org/tv/50712/season/3/episode/10",
    },
  ],
  title: "His Butler, Fulfilling His Duty",
  episodeType: "finale",
  stillPath: "/4xnOsQ99dn9QNEBgtVBiAeUCUOR.jpg",
  voteAverage: 6,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Episode
