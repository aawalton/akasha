import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS03e05 = {
  id: "01a183d7-7ce2-7a45-8b9a-5f24a3299ac8",
  type: "page-type/episode",
  slug: "hetalia-s03e05",
  description:
    "The continuation of Poland and Lithuania's story, plus part of the strip England Catches A Cold.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-3"],
  position: 5,
  publishedAt: "2010-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797724",
      externalLink: "https://www.themoviedb.org/tv/35138/season/3/episode/5",
    },
  ],
  title: "Warsaw Letter",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
