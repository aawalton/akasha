import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const spyXFamilySeason1 = {
  id: "01a183d8-6440-70b7-b2c4-efb4c7a7145f",
  type: "page-type/season",
  slug: "spy-x-family-season-1",
  description:
    "A spy, an assassin and a telepath come together to pose as a family, each for their own reasons, while hiding their true identities from each other.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/spy-x-family"],
  position: 1,
  publishedAt: "2022-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "184428",
      externalLink: "https://www.themoviedb.org/tv/120089/season/1",
    },
  ],
  title: "SPY x FAMILY Season 1",
  posterPath: "/l5YWziTwsLMkpSyWGx149uidb8m.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:49:19.165Z",
  updatedAt: "2026-10-28T18:49:19.165Z",
} as const satisfies Season
