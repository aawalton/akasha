import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS02e09 = {
  id: "01a18843-1871-76de-aeb1-cd10db6d0cea",
  type: "page-type/episode",
  slug: "andor-s02e09",
  description:
    "In the Ghorman aftermath, Mon Mothma takes a stand. Cassian must carry out a difficult extraction.",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-2"],
  position: 9,
  publishedAt: "2025-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5747438",
      externalLink: "https://www.themoviedb.org/tv/83867/season/2/episode/9",
    },
  ],
  title: "Welcome to the Rebellion",
  episodeType: "standard",
  stillPath: "/uBTinBPgka1JL9wdwVQVX08GhbA.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
