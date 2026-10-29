import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason23 = {
  id: "01a18855-c2a2-79d4-8c05-01ff78488077",
  type: "page-type/season",
  slug: "studio-c-season-23",
  description: "Season 23 of Studio C premiered on October 19, 2026.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/studio-c"],
  position: 23,
  publishedAt: "2026-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "517268",
      externalLink: "https://www.themoviedb.org/tv/68207/season/23",
    },
  ],
  title: "Studio C Season 23",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Season
