import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS02e02 = {
  id: "01a183d6-3262-7e98-ab59-80d2a5da726e",
  type: "page-type/episode",
  slug: "gintama-s02e02",
  description:
    "A baby is dropped off in front of the Yorozuya with a note claiming it's Gintoki's son.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-2"],
  position: 2,
  publishedAt: "2007-04-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940326",
      externalLink: "https://www.themoviedb.org/tv/57041/season/2/episode/2",
    },
  ],
  title: "Milk Should Be Served at Body Temperature",
  episodeType: "standard",
  stillPath: "/mQ8eMqXSfdAizm1ke3TKdhpmuko.jpg",
  voteAverage: 9,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
