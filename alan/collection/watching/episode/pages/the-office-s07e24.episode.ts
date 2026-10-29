import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e24 = {
  id: "01a18857-c36d-7c53-96c4-76feb07224de",
  type: "page-type/episode",
  slug: "the-office-s07e24",
  description:
    "Deangelo's new replacement is sought out through a search committee process led by Jim.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 24,
  publishedAt: "2011-05-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170287",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/24",
    },
  ],
  title: "Search Committee",
  episodeType: "finale",
  stillPath: "/nNKvtqHwK7KSpG38WeUgQZuAvZ.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
