import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e10 = {
  id: "01a1884b-ef84-734f-aa58-1b0fb31a62ae",
  type: "page-type/episode",
  slug: "ncis-s22e10",
  description:
    "After NCIS learns that the owner of Parker's favorite bakery is being blackmailed, they hatch a plan to save her from the perpetrators.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 10,
  publishedAt: "2025-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5817138",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/10",
    },
  ],
  title: "Baker's Man",
  episodeType: "standard",
  stillPath: "/sQWbWyoyfK5RFeEdVbHv47Jsf0f.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
