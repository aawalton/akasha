import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e11 = {
  id: "01a18857-c36e-735b-b01c-c4c808fff697",
  type: "page-type/episode",
  slug: "the-office-s08e11",
  description:
    "Pressed to boost the bottom line, Andy finds a novel way to improve sales, while Dwight explores corporate opportunities outside Scranton.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 11,
  publishedAt: "2012-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170297",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/11",
    },
  ],
  title: "Trivia",
  episodeType: "standard",
  stillPath: "/9o1nrhyZ9ytj9yMdsKp8h0BAqI7.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
