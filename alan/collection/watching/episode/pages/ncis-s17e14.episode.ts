import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e14 = {
  id: "01a1884b-ef79-797f-bb9f-ef4e90c19dda",
  type: "page-type/episode",
  slug: "ncis-s17e14",
  description:
    "After Torres and Bishop are victims of a hit-and-run, Torres fights for his life in the Intensive Care Unit.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 14,
  publishedAt: "2020-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2064015",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/14",
    },
  ],
  title: "On Fire",
  episodeType: "standard",
  stillPath: "/Aw6fHV6IN4fdFp0CizDbWcpK0E.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
