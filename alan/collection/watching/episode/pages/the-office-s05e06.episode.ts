import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e06 = {
  id: "01a18857-c369-76b2-91d5-03bb1c0a1d68",
  type: "page-type/episode",
  slug: "the-office-s05e06",
  description:
    "Dwight and Jim are shocked when they get the results of the annual customer survey report. Pam and Jim decide they want to spend every minute together using their bluetooth phones. Meanwhile, Angela and Andy pick an unusual location for their wedding.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 6,
  publishedAt: "2008-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170212",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/6",
    },
  ],
  title: "Customer Survey",
  episodeType: "standard",
  stillPath: "/xxwv62e1JCllMd71U21xn9YGngN.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
