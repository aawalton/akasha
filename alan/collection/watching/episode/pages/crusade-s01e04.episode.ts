import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const crusadeS01e04 = {
  id: "01a18845-c75e-7976-bae5-5c1c2cd05106",
  type: "page-type/episode",
  slug: "crusade-s01e04",
  description:
    "A mysterious sphere prompts Gideon and the others to relive traumatic moments from their past.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/crusade-season-1"],
  position: 4,
  publishedAt: "1999-06-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "147540",
      externalLink: "https://www.themoviedb.org/tv/2120/season/1/episode/4",
    },
  ],
  title: "The Path of Sorrows",
  episodeType: "standard",
  stillPath: "/bjwBgyd9eipt5fXSfouKychcbKR.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:27:16.829Z",
  updatedAt: "2026-10-29T15:27:16.829Z",
} as const satisfies Episode
