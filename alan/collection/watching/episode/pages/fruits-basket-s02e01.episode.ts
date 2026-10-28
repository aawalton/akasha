import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const fruitsBasketS02e01 = {
  id: "01a183d3-70a8-756f-970f-29ef69817fb8",
  type: "page-type/episode",
  slug: "fruits-basket-s02e01",
  description:
    "Motoko continues to fawn over Yuki from afar as he meets Kakeru Manabe and Machi Kuragi, an odd pair with quirky habits.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/fruits-basket-season-2"],
  position: 1,
  publishedAt: "2020-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1935016",
      externalLink: "https://www.themoviedb.org/tv/85991/season/2/episode/1",
    },
  ],
  title: "Hello Again",
  episodeType: "standard",
  stillPath: "/nMUtZNwpMyPBi5ZGlsM9OHl9dWb.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:43:54.662Z",
  updatedAt: "2026-10-28T18:43:54.662Z",
} as const satisfies Episode
