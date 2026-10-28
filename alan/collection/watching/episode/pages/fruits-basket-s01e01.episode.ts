import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const fruitsBasketS01e01 = {
  id: "01a183d3-70a6-7d5b-9692-3a03f28d50b2",
  type: "page-type/episode",
  slug: "fruits-basket-s01e01",
  description:
    "Temporarily homeless high school student Tohru Honda doesn't want to cause her friends any trouble, so she's been secretly living in a tent instead of asking to stay with any of them. Then she meets the owners of the land she pitched her tent on...",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/fruits-basket-season-1"],
  position: 1,
  publishedAt: "2019-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1677072",
      externalLink: "https://www.themoviedb.org/tv/85991/season/1/episode/1",
    },
  ],
  title: "See You After School",
  episodeType: "standard",
  stillPath: "/r7kYBL0xLxAvmuzf2Jp4fdQl0Ro.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-28T18:43:54.662Z",
  updatedAt: "2026-10-28T18:43:54.662Z",
} as const satisfies Episode
