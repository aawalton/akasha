import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e07 = {
  id: "01a1884b-ef6e-78f4-ae0b-7b879a151d88",
  type: "page-type/episode",
  slug: "ncis-s09e07",
  description:
    "The NCIS team searches for answers when the current husband of both Gibbs' and Fornell's ex-wife is suspiciously kidnapped.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 7,
  publishedAt: "2011-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334598",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/7",
    },
  ],
  title: "Devil's Triangle",
  episodeType: "standard",
  stillPath: "/pdeV9fcs7LYR9KKh0q1Mcw94dxH.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
