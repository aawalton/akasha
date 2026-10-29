import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisOriginsS01e11 = {
  id: "01a1884b-5349-7121-b80a-795bd650c1d4",
  type: "page-type/episode",
  slug: "ncis-origins-s01e11",
  description:
    "The team investigates the death of a famed Marine commander's son, while a pivotal part of Franks' past involving his family is revealed.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-origins-season-1"],
  position: 11,
  publishedAt: "2025-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5760753",
      externalLink: "https://www.themoviedb.org/tv/243006/season/1/episode/11",
    },
  ],
  title: "Flight of Icarus",
  episodeType: "standard",
  stillPath: "/mkgBXgB2FQcdVyWP4b4GAGGdobJ.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Episode
