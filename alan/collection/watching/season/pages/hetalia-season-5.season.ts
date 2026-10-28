import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const hetaliaSeason5 = {
  id: "01a183d7-7ce8-7cc3-b075-7df7964311b9",
  type: "page-type/season",
  slug: "hetalia-season-5",
  description:
    "Catch up with the nations in this latest season where we have more silly shenanigans.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/hetalia"],
  position: 5,
  publishedAt: "2015-07-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "126232",
      externalLink: "https://www.themoviedb.org/tv/35138/season/5",
    },
  ],
  title: "The World Twinkle",
  posterPath: "/3ZEJIkZZMD2lEzjBnoudJHFCfpH.jpg",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Season
