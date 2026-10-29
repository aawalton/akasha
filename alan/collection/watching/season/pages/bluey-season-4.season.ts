import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blueySeason4 = {
  id: "01a18843-d156-7241-b449-0cb912e54672",
  type: "page-type/season",
  slug: "bluey-season-4",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/bluey"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "545280",
      externalLink: "https://www.themoviedb.org/tv/82728/season/4",
    },
  ],
  title: "Bluey Season 4",
  voteAverage: 0,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Season
