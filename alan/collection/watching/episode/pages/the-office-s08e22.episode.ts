import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e22 = {
  id: "01a18857-c36e-7b46-8007-e65aba0664a2",
  type: "page-type/episode",
  slug: "the-office-s08e22",
  description:
    "Unemployed Andy crashes a fundraiser for the Senator and winds up adopting twelve disabled dogs. Dwight discovers that winning an auction means losing money, and Darryl teaches Nellie how to eat a taco.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 22,
  publishedAt: "2012-04-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170307",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/22",
    },
  ],
  title: "Fundraiser",
  episodeType: "standard",
  stillPath: "/baFG7yOX05mOgVfBaQ0Ifu5RsU0.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
