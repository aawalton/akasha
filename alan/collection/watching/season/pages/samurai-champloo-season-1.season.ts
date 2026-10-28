import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const samuraiChamplooSeason1 = {
  id: "01a183dd-7327-703f-b4d5-a07deaf61264",
  type: "page-type/season",
  slug: "samurai-champloo-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/samurai-champloo"],
  position: 1,
  publishedAt: "2004-05-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3015",
      externalLink: "https://www.themoviedb.org/tv/1063/season/1",
    },
  ],
  title: "Samurai Champloo Season 1",
  posterPath: "/apvKSvzUfKoIKmDGgDMRyB1oUmD.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:54:50.662Z",
  updatedAt: "2026-10-28T18:54:50.662Z",
} as const satisfies Season
