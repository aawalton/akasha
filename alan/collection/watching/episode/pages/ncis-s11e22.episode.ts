import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e22 = {
  id: "01a1884b-ef71-7b87-846d-19797a49683e",
  type: "page-type/episode",
  slug: "ncis-s11e22",
  description:
    "When a Marine photographer disappears prior to providing his testimony in an Army court-martial hearing, the NCIS team investigates both the murder he witnessed, as well as his current piece on military veterans who are homeless in the D.C. area.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 22,
  publishedAt: "2014-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "974625",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/22",
    },
  ],
  title: "Shooter",
  episodeType: "standard",
  stillPath: "/hLZkbKv65HkAeGnuUzNWafwR3t.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
