import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const jessicaJonesS03e01 = {
  id: "01a18849-e9ad-713c-be86-1f6bac6a202f",
  type: "page-type/episode",
  slug: "jessica-jones-s03e01",
  description:
    "As Jessica focuses on helping the helpless, Dorothy Walker shows up at Alias to beg for help finding a missing Trish.",
  ownLength: 52,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-jessica-jones-season-3"],
  position: 1,
  publishedAt: "2019-06-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1800194",
      externalLink: "https://www.themoviedb.org/tv/38472/season/3/episode/1",
    },
  ],
  title: "AKA The Perfect Burger",
  episodeType: "standard",
  stillPath: "/bGRr8LtxOUBuEmFwmNRn4bjXpct.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:31:47.755Z",
  updatedAt: "2026-10-29T15:31:47.755Z",
} as const satisfies Episode
