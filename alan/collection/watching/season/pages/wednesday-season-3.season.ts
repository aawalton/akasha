import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const wednesdaySeason3 = {
  id: "01a18859-9c3d-7934-a76a-b7c0f8e9fb30",
  type: "page-type/season",
  slug: "wednesday-season-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/wednesday"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "502202",
      externalLink: "https://www.themoviedb.org/tv/119051/season/3",
    },
  ],
  title: "Wednesday Season 3",
  posterPath: "/8T7c6K6Ytx8nryt2Y9lw9mAtNGt.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:48:56.509Z",
  updatedAt: "2026-10-29T15:48:56.509Z",
} as const satisfies Season
