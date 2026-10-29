import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const highPotentialSeason3 = {
  id: "01a18849-7d0f-76b7-a05f-66fc7c951daf",
  type: "page-type/season",
  slug: "high-potential-season-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/high-potential"],
  position: 3,
  publishedAt: "2027-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "523229",
      externalLink: "https://www.themoviedb.org/tv/226637/season/3",
    },
  ],
  title: "High Potential Season 3",
  voteAverage: 0,
  createdAt: "2026-10-29T15:31:19.951Z",
  updatedAt: "2026-10-29T15:31:19.951Z",
} as const satisfies Season
