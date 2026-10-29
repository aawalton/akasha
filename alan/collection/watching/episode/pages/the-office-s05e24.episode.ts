import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e24 = {
  id: "01a18857-c36a-7896-88c7-3ce79c14d7c9",
  type: "page-type/episode",
  slug: "the-office-s05e24",
  description:
    'Michael has to mediate a dispute within his new sales team. Meanwhile, trouble brews in the office when several employees take the term "casual" Fridays too loosely.',
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 24,
  publishedAt: "2009-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170221",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/24",
    },
  ],
  title: "Casual Friday",
  episodeType: "standard",
  stillPath: "/3FDbAunlvUBvmJa8b8dxAyk9Lin.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
