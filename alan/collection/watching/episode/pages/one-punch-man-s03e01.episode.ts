import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePunchManS03e01 = {
  id: "01a183d8-ba31-78c8-b21d-549006692427",
  type: "page-type/episode",
  slug: "one-punch-man-s03e01",
  description:
    "The heroes plan a rescue of a child kidnapped by monsters, while Garou awakens deep underground.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/one-punch-man-season-3"],
  position: 1,
  publishedAt: "2025-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6501542",
      externalLink: "https://www.themoviedb.org/tv/63926/season/3/episode/1",
    },
  ],
  title: "Strategy Meeting",
  episodeType: "standard",
  stillPath: "/vcyxcIh8GeQBFaFlyDxhbEMB2Ta.jpg",
  voteAverage: 5.1,
  createdAt: "2026-10-28T18:49:41.167Z",
  updatedAt: "2026-10-28T18:49:41.167Z",
} as const satisfies Episode
