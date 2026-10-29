import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS02e22 = {
  id: "01a18857-c367-77f5-97bd-25c1cb710e8c",
  type: "page-type/episode",
  slug: "the-office-s02e22",
  description:
    "In the season finale, Dunder-Mifflin holds a Casino Night in the warehouse to benefit charity. While Michael faces the task of juggling two dates, Jim is forced to ponder the reality of transferring to the Stamford branch and what that means for his relationship with Pam.",
  ownLength: 29,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-2"],
  position: 22,
  publishedAt: "2006-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170153",
      externalLink: "https://www.themoviedb.org/tv/2316/season/2/episode/22",
    },
  ],
  title: "Casino Night",
  episodeType: "finale",
  stillPath: "/qfneU9aQXDbK1RxBitIXrxmfqho.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
