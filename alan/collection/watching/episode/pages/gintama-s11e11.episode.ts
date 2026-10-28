import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS11e11 = {
  id: "01a183d6-3278-73b7-b387-dc39def58267",
  type: "page-type/episode",
  slug: "gintama-s11e11",
  description:
    "Okita and Kagura's daughter (?) rekindle their rivalry, and Okita senses something is off. Meanwhile, Gintoki runs into an old friend.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-11"],
  position: 11,
  publishedAt: "2018-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1573672",
      externalLink: "https://www.themoviedb.org/tv/57041/season/11/episode/11",
    },
  ],
  title: "Two in Girl Years Is Equal to Ten in Man Years",
  episodeType: "standard",
  stillPath: "/vrumEpyWwQ2tDaP34VTaPRwsnR5.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
