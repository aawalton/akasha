import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const chainsawManSeason1 = {
  id: "01a183d5-2788-72e3-9602-8c610227fff2",
  type: "page-type/season",
  slug: "chainsaw-man-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/chainsaw-man"],
  position: 1,
  publishedAt: "2022-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "171559",
      externalLink: "https://www.themoviedb.org/tv/114410/season/1",
    },
  ],
  title: "Chainsaw Man Season 1",
  posterPath: "/wi059pAZjRN3BbDSB1tMqXgwRDa.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-28T18:45:47.015Z",
  updatedAt: "2026-10-28T18:45:47.015Z",
} as const satisfies Season
