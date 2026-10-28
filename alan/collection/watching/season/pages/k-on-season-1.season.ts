import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const kOnSeason1 = {
  id: "01a183da-447b-768c-8c32-d849ddcc97f4",
  type: "page-type/season",
  slug: "k-on-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/k-on"],
  position: 1,
  publishedAt: "2009-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "52078",
      externalLink: "https://www.themoviedb.org/tv/42253/season/1",
    },
  ],
  title: "K-ON!",
  posterPath: "/4VptMvnDRRsUeeNRs6UTPKTjqiX.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Season
