import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const cardcaptorSakuraSeason2 = {
  id: "01a183db-217d-7d4b-b45e-af3b3470f084",
  type: "page-type/season",
  slug: "cardcaptor-sakura-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/cardcaptor-sakura"],
  position: 2,
  publishedAt: "1999-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "46556",
      externalLink: "https://www.themoviedb.org/tv/35790/season/2",
    },
  ],
  title: "Cardcaptor Sakura Season 2",
  posterPath: "/3mBdXJcIDA98TFFLX0zNWKSdKdq.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:52:18.678Z",
  updatedAt: "2026-10-28T18:52:18.678Z",
} as const satisfies Season
