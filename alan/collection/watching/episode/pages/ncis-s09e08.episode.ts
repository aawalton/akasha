import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e08 = {
  id: "01a1884b-ef6e-7856-a703-608687952391",
  type: "page-type/episode",
  slug: "ncis-s09e08",
  description:
    "The NCIS team uncovers a discrepancy with DNA remains when investigating the crash of a military plane that had been transporting caskets.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 8,
  publishedAt: "2011-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334597",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/8",
    },
  ],
  title: "Engaged (1)",
  episodeType: "standard",
  stillPath: "/humv4bBKDeIOLCdJr9d3SGdHHnc.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
