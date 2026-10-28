import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const neonGenesisEvangelionSeason1 = {
  id: "01a183d4-bed3-7169-b6a6-241d35f1302e",
  type: "page-type/season",
  slug: "neon-genesis-evangelion-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/neon-genesis-evangelion"],
  position: 1,
  publishedAt: "1995-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "51882",
      externalLink: "https://www.themoviedb.org/tv/890/season/1",
    },
  ],
  title: "Neon Genesis Evangelion Season 1",
  posterPath: "/574vWDIZ1U6gOYoRcOHbIM7c9UT.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:45:20.209Z",
  updatedAt: "2026-10-28T18:45:20.209Z",
} as const satisfies Season
