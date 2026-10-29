import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e03 = {
  id: "01a18857-c36e-7e3b-b4c9-c71cd915d0d5",
  type: "page-type/episode",
  slug: "the-office-s09e03",
  description:
    "Andy flaunts his genealogy when he discovers he's related to Michelle Obama. Meanwhile, Darryl struggles in his new post, Dwight teaches Erin a new language to wow her boyfriend's family, and Nellie tries to persuade Pam that Jim's having an affair.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 3,
  publishedAt: "2012-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170317",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/3",
    },
  ],
  title: "Andy's Ancestry",
  episodeType: "standard",
  stillPath: "/fhlA5VjRYpdz9Lz240rBHkzdith.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
