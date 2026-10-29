import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS04e09 = {
  id: "01a18859-3c6a-7f4a-8089-5935b60db124",
  type: "page-type/episode",
  slug: "torchwood-s04e09",
  description:
    "With the whole world in recession, a defeated Torchwood team take their last chance and make a deal with the devil.",
  ownLength: 56,
  ownProgress: 0,
  partOfCollections: ["season/miracle-day"],
  position: 9,
  publishedAt: "2011-09-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21618",
      externalLink: "https://www.themoviedb.org/tv/424/season/4/episode/9",
    },
  ],
  title: "The Gathering",
  episodeType: "standard",
  stillPath: "/jmQWmdBg5DrWJgUUfc0on3d0XEs.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
