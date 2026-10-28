import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const hetaliaSeason4 = {
  id: "01a183d7-7ce7-71b5-a38f-9041673bab51",
  type: "page-type/season",
  slug: "hetalia-season-4",
  description:
    "The adorable boys of Hetalia are back with some new friends and a super sparkly new look.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/hetalia"],
  position: 4,
  publishedAt: "2013-01-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "126231",
      externalLink: "https://www.themoviedb.org/tv/35138/season/4",
    },
  ],
  title: "The Beautiful World",
  posterPath: "/hytwWkso8iywgyuPyjXIuZEcmVg.jpg",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Season
