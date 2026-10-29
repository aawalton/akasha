import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS03e14 = {
  id: "01a18857-c368-73cf-9438-6613a14a75f9",
  type: "page-type/episode",
  slug: "the-office-s03e14",
  description:
    "Michael celebrates Phyllis' wedding shower by bringing two adult performers into the office, a stripper and Ben Franklin. Meanwhile, Karen confronts Pam about her past history with Jim.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-3"],
  position: 14,
  publishedAt: "2007-02-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1034981",
      externalLink: "https://www.themoviedb.org/tv/2316/season/3/episode/14",
    },
  ],
  title: "Ben Franklin",
  episodeType: "standard",
  stillPath: "/Are3Iz2bsskzM9wJL07T8sDTbFO.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
