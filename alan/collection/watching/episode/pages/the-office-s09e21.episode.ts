import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e21 = {
  id: "01a18857-c36f-71f4-b552-855afb8eda7d",
  type: "page-type/episode",
  slug: "the-office-s09e21",
  description:
    "Dwight becomes regional manager after Andy quits his job, Jim dedicates more time to his Dunder Mifflin job to save his marriage, and Angela has problems with her new living arrangements after her breakup with The Senator.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 21,
  publishedAt: "2013-05-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2066426",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/21",
    },
  ],
  title: "Livin' the Dream",
  episodeType: "standard",
  stillPath: "/viBmFStZIZMOXq71YDrBgqZEhDD.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
