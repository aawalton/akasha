import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS03e11 = {
  id: "01a183d6-3265-75b3-84a8-bb1a68f33042",
  type: "page-type/episode",
  slug: "gintama-s03e11",
  description:
    "Katsura is inprisoned, and fellow inmate Suekichi tries to find a way to make Katsura fall asleep so that he can make his escape.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-3"],
  position: 11,
  publishedAt: "2008-06-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940495",
      externalLink: "https://www.themoviedb.org/tv/57041/season/3/episode/11",
    },
  ],
  title: "People Are All Escapees of Their Own Inner Prisons",
  episodeType: "standard",
  stillPath: "/8Fq9QpnpsbUSzwB7nH8IUbsHyEb.jpg",
  voteAverage: 9,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
