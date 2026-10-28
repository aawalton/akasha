import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const bleachSeason1 = {
  id: "01a183d3-f485-7aaa-a2e8-037280dddfc9",
  type: "page-type/season",
  slug: "bleach-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/bleach"],
  position: 1,
  publishedAt: "2004-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "42567",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1",
    },
  ],
  title: "Bleach",
  posterPath: "/5iVUUnE2tgBPypACYNobCKHagfV.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Season
