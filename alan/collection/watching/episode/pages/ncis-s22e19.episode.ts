import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e19 = {
  id: "01a1884b-ef84-7824-b0b1-0c6201386817",
  type: "page-type/episode",
  slug: "ncis-s22e19",
  description:
    "McGee's career and credibility are on the line when he investigates the Deputy Director for corruption.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 19,
  publishedAt: "2025-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6072508",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/19",
    },
  ],
  title: "Irreconcilable Differences",
  episodeType: "standard",
  stillPath: "/jy1oLJ8YhpwPviIE79KlNAY3GLn.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
