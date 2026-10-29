import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const highPotentialS01e11 = {
  id: "01a18884-2f3b-7d99-aac3-4ee5edbde16d",
  type: "page-type/episode",
  slug: "high-potential-s01e11",
  description:
    "Soto reopens an old murder case in the famous Donovan family, determined to uncover the true killer in classic “whodunit” style.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/high-potential-season-1"],
  position: 11,
  publishedAt: "2025-01-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5889903",
      externalLink: "https://www.themoviedb.org/tv/226637/season/1/episode/11",
    },
  ],
  title: "The Sauna at the End of the Stairs",
  episodeType: "standard",
  stillPath: "/mbVgPRT9pnHOfOGIQY2e9xcYfM6.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:35:26.651Z",
  updatedAt: "2026-10-29T16:35:26.651Z",
} as const satisfies Episode
