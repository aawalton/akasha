import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const twelveDatesTilChristmasSeason1 = {
  id: "01a18859-5066-794c-bfa3-7a8a280267d0",
  type: "page-type/season",
  slug: "twelve-dates-til-christmas-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/twelve-dates-til-christmas"],
  position: 1,
  publishedAt: "2025-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "450711",
      externalLink: "https://www.themoviedb.org/tv/288586/season/1",
    },
  ],
  title: "Twelve Dates 'Til Christmas Season 1",
  voteAverage: 0,
  createdAt: "2026-10-29T15:48:37.093Z",
  updatedAt: "2026-10-29T15:48:37.093Z",
} as const satisfies Season
