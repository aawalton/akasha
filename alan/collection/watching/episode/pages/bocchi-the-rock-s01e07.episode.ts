import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bocchiTheRockS01e07 = {
  id: "01a183d9-6b68-71d8-8a13-f172f8d05e25",
  type: "page-type/episode",
  slug: "bocchi-the-rock-s01e07",
  description:
    "It's a party at Bocchi's house when the girls come by to make T-shirt designs! But can she handle her first real friend visit?!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/bocchi-the-rock-season-1"],
  position: 7,
  publishedAt: "2022-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3989998",
      externalLink: "https://www.themoviedb.org/tv/119100/season/1/episode/7",
    },
  ],
  title: "To Your House",
  episodeType: "standard",
  stillPath: "/d4HtnohyUi16bDNYc9KSfYS6Nie.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:50:26.535Z",
  updatedAt: "2026-10-28T18:50:26.535Z",
} as const satisfies Episode
