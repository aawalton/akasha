import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const goodWitchSeason4 = {
  id: "01a18849-352b-74b0-8479-d313d9436881",
  type: "page-type/season",
  slug: "good-witch-season-4",
  description:
    "Season 4 of Good Witch picks up with Cassie and Sam's new engagement and what that means for our cast of characters in Middleton.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/good-witch"],
  position: 4,
  publishedAt: "2018-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "98288",
      externalLink: "https://www.themoviedb.org/tv/61864/season/4",
    },
  ],
  title: "Good Witch Season 4",
  posterPath: "/eRJZAHAlV391jN47W4Lb4NzrGHx.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Season
