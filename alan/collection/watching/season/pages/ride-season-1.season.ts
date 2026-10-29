import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const rideSeason1 = {
  id: "01a18851-699a-7ca4-af9d-c70102af2630",
  type: "page-type/season",
  slug: "ride-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/ride"],
  position: 1,
  publishedAt: "2023-03-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "311114",
      externalLink: "https://www.themoviedb.org/tv/211562/season/1",
    },
  ],
  title: "Ride Season 1",
  posterPath: "/qcGEINDOFneEA15mwHTUedoP3kS.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:39:59.257Z",
  updatedAt: "2026-10-29T15:39:59.257Z",
} as const satisfies Season
