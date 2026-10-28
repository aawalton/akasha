import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e14 = {
  id: "01a183d7-7ce1-7fb6-a410-a4b49fd9fc75",
  type: "page-type/episode",
  slug: "hetalia-s02e14",
  description:
    "Continuation of The Battle For America: England and France continue their fight over the young America.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 14,
  publishedAt: "2009-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797707",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/14",
    },
  ],
  title: "The Battle for America (2)",
  episodeType: "standard",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
