import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e05 = {
  id: "01a183d7-7ce1-7dbc-95e1-9463dca3a48d",
  type: "page-type/episode",
  slug: "hetalia-s02e05",
  description:
    "In a universe similar yet different from this one, three students at the Academy Of The World decide to survey the others on how they spend their winter holiday.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 5,
  publishedAt: "2009-08-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797698",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/5",
    },
  ],
  title: "Academy Hetalia Christmas",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
