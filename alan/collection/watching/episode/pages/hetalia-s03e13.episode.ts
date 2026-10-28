import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS03e13 = {
  id: "01a183d7-7ce2-70a8-bb85-35986f69acec",
  type: "page-type/episode",
  slug: "hetalia-s03e13",
  description: "The War of Austrian Succession starts.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-3"],
  position: 13,
  publishedAt: "2010-06-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797732",
      externalLink: "https://www.themoviedb.org/tv/35138/season/3/episode/13",
    },
  ],
  title: "Reinforcement from Hungary",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
