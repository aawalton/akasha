import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e01 = {
  id: "01a183d7-7ce0-74ba-8c8e-0c2ebcf0f74b",
  type: "page-type/episode",
  slug: "hetalia-s02e01",
  description:
    "The Allied Forces, in their ongoing fight against the Axis Powers, manage to get ahold of one of Germany's prized possessions: an observation diary dealing with Italy's strange behavior and uselessness in combat.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 1,
  publishedAt: "2009-07-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797694",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/1",
    },
  ],
  title: "Germany's Diary",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
