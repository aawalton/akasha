import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e19 = {
  id: "01a183d7-7ce1-755a-a760-453db2363bf2",
  type: "page-type/episode",
  slug: "hetalia-s02e19",
  description: "The origin of Liechtenstein is detailed.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 19,
  publishedAt: "2009-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797712",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/19",
    },
  ],
  title: "Liechtenstein Begins",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
