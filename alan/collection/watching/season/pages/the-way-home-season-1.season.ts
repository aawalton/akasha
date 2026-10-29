import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theWayHomeSeason1 = {
  id: "01a18858-c551-7e63-a58d-7375f3928aec",
  type: "page-type/season",
  slug: "the-way-home-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/the-way-home"],
  position: 1,
  publishedAt: "2023-01-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "293481",
      externalLink: "https://www.themoviedb.org/tv/201836/season/1",
    },
  ],
  title: "The Way Home Season 1",
  posterPath: "/cGvwebNxel0BMy9Z7eWwDiQkigS.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:48:01.487Z",
  updatedAt: "2026-10-29T15:48:01.487Z",
} as const satisfies Season
