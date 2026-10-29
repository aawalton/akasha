import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e23 = {
  id: "01a18857-c36c-7830-bffd-4294ee05b894",
  type: "page-type/episode",
  slug: "the-office-s06e23",
  description:
    "Michael is surprisingly cheerful after learning some bad news about Donna. The new parents, Pam and Jim, have trouble staying awake in the office. Meanwhile, Angela takes matters into her own hands when Dwight refuses to honor their contract.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 23,
  publishedAt: "2010-05-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170193",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/23",
    },
  ],
  title: "The Chump",
  episodeType: "standard",
  stillPath: "/nGdklnVWRdmXpuckdyZTpvjwvt2.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
