import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const cardcaptorSakuraSeason1 = {
  id: "01a183db-217d-79ea-8d2b-81ae9df6a8c9",
  type: "page-type/season",
  slug: "cardcaptor-sakura-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/cardcaptor-sakura"],
  position: 1,
  publishedAt: "1998-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "46557",
      externalLink: "https://www.themoviedb.org/tv/35790/season/1",
    },
  ],
  title: "Cardcaptor Sakura Season 1",
  posterPath: "/dBJF9NRm6cee0i06C1xOdHfXGjd.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:52:18.678Z",
  updatedAt: "2026-10-28T18:52:18.678Z",
} as const satisfies Season
