import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const narutoShippudenSeason7 = {
  id: "01a183d2-3bf9-7b20-b7f9-bf407fc4994e",
  type: "page-type/season",
  slug: "naruto-shippuden-season-7",
  description:
    "The team is heading back to the village when an urgent assignment comes in from Tsunade that will lead them on a perilous journey to protect a young woman!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/naruto-shippuden"],
  position: 7,
  publishedAt: "2010-01-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "43379",
      externalLink: "https://www.themoviedb.org/tv/31910/season/7",
    },
  ],
  title: "S7 • Six Tails Unleashed",
  posterPath: "/42QaFSno1zuAPoaSydZw0koukvw.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Season
