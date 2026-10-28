import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const jujutsuKaisenSeason1 = {
  id: "01a183d3-532b-70f8-8321-41f60214547d",
  type: "page-type/season",
  slug: "jujutsu-kaisen-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/jujutsu-kaisen"],
  position: 1,
  publishedAt: "2020-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "135856",
      externalLink: "https://www.themoviedb.org/tv/95479/season/1",
    },
  ],
  title: "JUJUTSU KAISEN Season 1",
  posterPath: "/fHQ2XHRdRix0rkDCShmGQ8c6d03.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:43:47.111Z",
  updatedAt: "2026-10-28T18:43:47.111Z",
} as const satisfies Season
