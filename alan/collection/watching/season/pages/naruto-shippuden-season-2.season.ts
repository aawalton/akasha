import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const narutoShippudenSeason2 = {
  id: "01a183d2-3bf8-79f7-abbe-09e288d03c17",
  type: "page-type/season",
  slug: "naruto-shippuden-season-2",
  description:
    "In the midst of its spying mission, Team Kakashi is suddenly confronted with the Leaf Village's sworn enemy, Orochimaru. Naruto challenges him, and during their battle, his anger brings forth the power of the Nine-Tailed Fox. Naruto will never give up his determination to find Sasuke and bring him home, but in his rage he risks losing all awareness of himself and hurting those he cares for the most.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/naruto-shippuden"],
  position: 2,
  publishedAt: "2007-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "43374",
      externalLink: "https://www.themoviedb.org/tv/31910/season/2",
    },
  ],
  title: "S2 • Long-Awaited Reunion",
  posterPath: "/tq4UidtV47OkUbx8fIxMFlK3dAA.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Season
