import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e03 = {
  id: "01a1884b-ef6c-7db7-b7aa-77f4e90e4d7b",
  type: "page-type/episode",
  slug: "ncis-s08e03",
  description: "The team investigates a bomb tech's guarded personal life after she is attacked.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 3,
  publishedAt: "2010-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334569",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/3",
    },
  ],
  title: "Short Fuse",
  episodeType: "standard",
  stillPath: "/iPB3COSiUFr6lmQZN7dnE6AXqRy.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
