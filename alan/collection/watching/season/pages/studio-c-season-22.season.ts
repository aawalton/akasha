import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason22 = {
  id: "01a18855-c2a2-7801-b9ac-670d12285fe0",
  type: "page-type/season",
  slug: "studio-c-season-22",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/studio-c"],
  position: 22,
  publishedAt: "2026-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "506607",
      externalLink: "https://www.themoviedb.org/tv/68207/season/22",
    },
  ],
  title: "Studio C Season 22",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Season
