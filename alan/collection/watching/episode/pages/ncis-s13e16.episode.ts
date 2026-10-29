import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e16 = {
  id: "01a1884b-ef74-7ce7-a25d-0afc0bd643c5",
  type: "page-type/episode",
  slug: "ncis-s13e16",
  description:
    "Doctor Cyril Taft experiences the rush of an NCIS case after he is assigned surgical duty to Gibbs’ suspect and finds key evidence.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 16,
  publishedAt: "2016-02-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1168721",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/16",
    },
  ],
  title: "Loose Cannons",
  episodeType: "standard",
  stillPath: "/4EQk4vDcGVkwrrkATVGcRg2R1cl.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
