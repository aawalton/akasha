import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoShippudenS01e24 = {
  id: "01a183d2-3bd5-7782-9a01-04ff15d435d6",
  type: "page-type/episode",
  slug: "naruto-shippuden-s01e24",
  description:
    "Sakura counters the Iron Sand attack of the Third Kazekage puppet with superhuman strength.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/naruto-shippuden-season-1"],
  position: 24,
  publishedAt: "2007-08-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "761494",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1/episode/24",
    },
  ],
  title: "The Third Kazekage",
  episodeType: "standard",
  stillPath: "/6P2KJqTU7Zj8Y0hiJJwvg1CgnFF.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Episode
