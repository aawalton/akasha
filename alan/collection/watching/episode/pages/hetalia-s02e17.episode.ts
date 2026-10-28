import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e17 = {
  id: "01a183d7-7ce1-7ca5-a6ce-ebf889396de5",
  type: "page-type/episode",
  slug: "hetalia-s02e17",
  description: "Part two of the Russia's Big And Little Sisters story.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 17,
  publishedAt: "2009-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797710",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/17",
    },
  ],
  title: "Russia's Sisters (2)",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
