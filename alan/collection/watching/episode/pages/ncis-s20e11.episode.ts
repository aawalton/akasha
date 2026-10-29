import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e11 = {
  id: "01a1884b-ef82-7953-9e5f-cc037516962c",
  type: "page-type/episode",
  slug: "ncis-s20e11",
  description:
    "Parker discovers he's a victim of identity theft while investigating the unusual murder of a Navy ensign.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 11,
  publishedAt: "2023-01-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4117626",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/11",
    },
  ],
  title: "Bridges",
  episodeType: "standard",
  stillPath: "/xFlFq4w5YsVDWK1ND5pS1vtJaFK.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
