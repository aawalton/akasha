import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e05 = {
  id: "01a18857-c36b-7613-9cac-bc14c45c9a6d",
  type: "page-type/episode",
  slug: "the-office-s06e05",
  description:
    "Michael becomes convinced that an insurance salesman visiting the office is a part of the mafia, and Dwight and Andy accompany Michael to a meeting with him. Meanwhile, Kevin accidentally cancels Jim's credit card, while Jim and Pam are on their honeymoon in Puerto Rico.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 5,
  publishedAt: "2009-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170201",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/5",
    },
  ],
  title: "Mafia",
  episodeType: "standard",
  stillPath: "/haQudolF7pDPsUaYxcuUWJKOueM.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
