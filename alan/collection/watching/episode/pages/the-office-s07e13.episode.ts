import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e13 = {
  id: "01a18857-c36c-769f-bfdd-e780065085f8",
  type: "page-type/episode",
  slug: "the-office-s07e13",
  description:
    "Holly and Michael turn Andy's business seminar into an improv challenge. Erin and Gabe compete in a board game battle.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 13,
  publishedAt: "2011-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170276",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/13",
    },
  ],
  title: "The Seminar",
  episodeType: "standard",
  stillPath: "/K2OD2lVAerQU9dZgj1ldYp7S3t.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
