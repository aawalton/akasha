import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e19 = {
  id: "01a18857-c36b-7513-9950-52a98575035b",
  type: "page-type/episode",
  slug: "the-office-s06e19",
  description:
    "Michael gets kicked out of the bar when he pulls out all the stops to impress a friend of Jim and Pam's. Meanwhile, Andy and Erin do their best to keep their relationship under wraps. Dwight rethinks his pre-natal contract with Angela.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 19,
  publishedAt: "2010-03-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170192",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/19",
    },
  ],
  title: "Happy Hour",
  episodeType: "standard",
  stillPath: "/3pJIfZOXxReM3zOoJTv253tRbb3.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
