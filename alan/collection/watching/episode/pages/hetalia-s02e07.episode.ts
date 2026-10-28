import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e07 = {
  id: "01a183d7-7ce1-7dfd-973f-5ed2ba465b2b",
  type: "page-type/episode",
  slug: "hetalia-s02e07",
  description:
    "While camping out in the middle of a war front, Germany and Italy both make wishes on a shooting star, but which one will come true?",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 7,
  publishedAt: "2009-09-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797700",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/7",
    },
  ],
  title: "Wish on a Star",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
