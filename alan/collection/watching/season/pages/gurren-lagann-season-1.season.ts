import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gurrenLagannSeason1 = {
  id: "01a183db-aaff-7270-b82b-14b47010f06e",
  type: "page-type/season",
  slug: "gurren-lagann-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/gurren-lagann"],
  position: 1,
  publishedAt: "2007-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "31508",
      externalLink: "https://www.themoviedb.org/tv/21729/season/1",
    },
  ],
  title: "Gurren Lagann Season 1",
  posterPath: "/gRQwTvfd9r9Yso1HH5hAGcbpTnJ.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:52:53.885Z",
  updatedAt: "2026-10-28T18:52:53.885Z",
} as const satisfies Season
