import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS01e05 = {
  id: "01a18857-c365-786f-a717-28453cdb418b",
  type: "page-type/episode",
  slug: "the-office-s01e05",
  description:
    "The office staff play a basketball game against the warehouse workers in which Jim shows off to impress Pam and upstage her fiancee who is on the opposing team.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-1"],
  position: 5,
  publishedAt: "2005-04-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170131",
      externalLink: "https://www.themoviedb.org/tv/2316/season/1/episode/5",
    },
  ],
  title: "Basketball",
  episodeType: "standard",
  stillPath: "/2retmsI3vrQupspr9i2ZB21PhhN.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
