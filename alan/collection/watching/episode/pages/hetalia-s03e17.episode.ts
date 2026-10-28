import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS03e17 = {
  id: "01a183d7-7ce3-7c0e-a86b-d4d0bd755eb4",
  type: "page-type/episode",
  slug: "hetalia-s03e17",
  description:
    "Japan and Greece try to get angry. Finland and Sweden are living together on the road.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-3"],
  position: 17,
  publishedAt: "2010-07-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797736",
      externalLink: "https://www.themoviedb.org/tv/35138/season/3/episode/17",
    },
  ],
  title: "Lazy Japan's Anger",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
