import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const goodWitchSeason5 = {
  id: "01a18849-352b-7035-bb6d-6cf3288da3a2",
  type: "page-type/season",
  slug: "good-witch-season-5",
  description:
    "In season 5, Cassie and Sam begin married life, Grace and Nick look ahead to college as high school graduation looms, and others in town embark on new romances and endeavors. All the while, Cassie continues to work her special magic to help those around her.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/good-witch"],
  position: 5,
  publishedAt: "2019-06-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "119309",
      externalLink: "https://www.themoviedb.org/tv/61864/season/5",
    },
  ],
  title: "Good Witch Season 5",
  posterPath: "/uoZv2dlk0dnrAbS3cf74iynwtO3.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Season
