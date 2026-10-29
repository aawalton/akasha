import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const aGirlThingSeason1 = {
  id: "01a18842-f6d7-71ed-9dea-61f811a29e11",
  type: "page-type/season",
  slug: "a-girl-thing-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/a-girl-thing"],
  position: 1,
  publishedAt: "2001-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "481074",
      externalLink: "https://www.themoviedb.org/tv/303588/season/1",
    },
  ],
  title: "A Girl Thing Season 1",
  posterPath: "/lhU1uPxk8RzGrmmQyuJ3gDoIJA.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:24:12.374Z",
  updatedAt: "2026-10-29T15:24:12.374Z",
} as const satisfies Season
