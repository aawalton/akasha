import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const crusadeS01e05 = {
  id: "01a18845-c75e-7a04-84ec-b09797e0e560",
  type: "page-type/episode",
  slug: "crusade-s01e05",
  description:
    "Gideon must deport a colony of renegade humans. Dureena finds a lost tribe of her people.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/crusade-season-1"],
  position: 5,
  publishedAt: "1999-07-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "147552",
      externalLink: "https://www.themoviedb.org/tv/2120/season/1/episode/5",
    },
  ],
  title: "Patterns of the Soul",
  episodeType: "standard",
  stillPath: "/bpL1DaHUGryUz3tCQ1gHtyNqI5t.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:27:16.829Z",
  updatedAt: "2026-10-29T15:27:16.829Z",
} as const satisfies Episode
