import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const fruitsBasketS03e01 = {
  id: "01a183d3-70a9-7ebe-99e2-153469b816bf",
  type: "page-type/episode",
  slug: "fruits-basket-s03e01",
  description:
    "As Season 3 begins, Tohru struggles to digest all the new information she's learned from Kureno.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/fruits-basket-season-3"],
  position: 1,
  publishedAt: "2021-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2684455",
      externalLink: "https://www.themoviedb.org/tv/85991/season/3/episode/1",
    },
  ],
  title: "I'll Hold Another Banquet",
  episodeType: "standard",
  stillPath: "/sndMLcHH3qqeWWvrESH3fowFxAK.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:43:54.662Z",
  updatedAt: "2026-10-28T18:43:54.662Z",
} as const satisfies Episode
