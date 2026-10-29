import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e10 = {
  id: "01a18857-c36d-7ca0-be15-2d2a67fee734",
  type: "page-type/episode",
  slug: "the-office-s08e10",
  description:
    "Andy attempts to make everyone's Christmas wishes come true, including those of a drunken Erin. Meanwhile, Dwight and Jim are entangled in an escalating prank war wherein one attempts to frame the other.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 10,
  publishedAt: "2011-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170296",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/10",
    },
  ],
  title: "Christmas Wishes",
  episodeType: "mid-season",
  stillPath: "/uyVT1YaxJuNhYnrfDFNdWiu65yY.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
