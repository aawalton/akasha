import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e09 = {
  id: "01a1884b-ef72-7e8c-b84e-7ac7a8036cc1",
  type: "page-type/episode",
  slug: "ncis-s12e09",
  description:
    "While stuck at the Dulles airport due to inclement weather, DiNozzo, Bishop, and her husband Jake work an NCIS case involving an elevated terrorist threat at Northeast airports during the Thanksgiving travel surge.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 9,
  publishedAt: "2014-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1016872",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/9",
    },
  ],
  title: "Grounded",
  episodeType: "standard",
  stillPath: "/6GtDAggAxzHRT1cxDdJct6PFrVQ.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
