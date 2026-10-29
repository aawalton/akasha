import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const severanceSeason3 = {
  id: "01a18851-cdc2-7e25-902f-562982d14bd4",
  type: "page-type/season",
  slug: "severance-season-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/severance"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "447475",
      externalLink: "https://www.themoviedb.org/tv/95396/season/3",
    },
  ],
  title: "Severance Season 3",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:24.898Z",
  updatedAt: "2026-10-29T15:40:24.898Z",
} as const satisfies Season
