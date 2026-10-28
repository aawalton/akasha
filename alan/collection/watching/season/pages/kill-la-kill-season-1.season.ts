import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const killLaKillSeason1 = {
  id: "01a183dd-9a73-7db9-b4b5-dfa3ba7dbff9",
  type: "page-type/season",
  slug: "kill-la-kill-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/kill-la-kill"],
  position: 1,
  publishedAt: "2013-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "60510",
      externalLink: "https://www.themoviedb.org/tv/60728/season/1",
    },
  ],
  title: "Kill la Kill Season 1",
  posterPath: "/qKIdLvvNCU1BOFlaO6ra2pTl2AY.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:55:00.722Z",
  updatedAt: "2026-10-28T18:55:00.722Z",
} as const satisfies Season
