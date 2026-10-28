import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS01e02 = {
  id: "01a183d7-7cdf-77f7-b30f-13b0643e7b38",
  type: "page-type/episode",
  slug: "hetalia-s01e02",
  description:
    "It's WWI, and Germany, in search of the heir to the legendary Roman Empire, discovers an abandoned tomato crate sitting in the middle of the woods. However, even Germany finds himself unprepared to deal with the strange descendant of Rome.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-1"],
  position: 2,
  publishedAt: "2009-01-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797670",
      externalLink: "https://www.themoviedb.org/tv/35138/season/1/episode/2",
    },
  ],
  title: "WWI",
  episodeType: "standard",
  stillPath: "/kJNO9aLYdh3VI9afCojopPLYJAx.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
