import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const goodWitchSeason6 = {
  id: "01a18849-352b-74ff-8cd1-ac02734eac69",
  type: "page-type/season",
  slug: "good-witch-season-6",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/good-witch"],
  position: 6,
  publishedAt: "2020-05-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "148485",
      externalLink: "https://www.themoviedb.org/tv/61864/season/6",
    },
  ],
  title: "Good Witch Season 6",
  posterPath: "/kdpN3B85Sgh9VUMOxr1PhGm8GCO.jpg",
  voteAverage: 5.3,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Season
