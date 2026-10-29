import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e12 = {
  id: "01a1884b-ef84-7742-b448-5ac98b54111b",
  type: "page-type/episode",
  slug: "ncis-s22e12",
  description: "NCIS investigates the fatal poisoning of one of Kasie's forensic scientists.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 12,
  publishedAt: "2025-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5874211",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/12",
    },
  ],
  title: "Fun and Games",
  episodeType: "standard",
  stillPath: "/c2upzX68oup4PFbMgYksNUk0WFZ.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
