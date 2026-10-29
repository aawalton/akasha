import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason24 = {
  id: "01a18855-c2a2-7118-a76d-fd93a6c44ed5",
  type: "page-type/season",
  slug: "studio-c-season-24",
  description: "Sketch comedy for the whole family. Always a GOOD laugh!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/studio-c"],
  position: 24,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "517269",
      externalLink: "https://www.themoviedb.org/tv/68207/season/24",
    },
  ],
  title: "Studio C Season 24",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Season
