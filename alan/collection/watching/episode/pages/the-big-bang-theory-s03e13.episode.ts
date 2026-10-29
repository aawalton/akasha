import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS03e13 = {
  id: "01a18856-4000-7230-99e7-2424f09a06b5",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s03e13",
  description:
    "When their apartment is robbed, Leonard and Sheldon turn to their friends to create a state-of-the-art security system.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-3"],
  position: 13,
  publishedAt: "2010-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64691",
      externalLink: "https://www.themoviedb.org/tv/1418/season/3/episode/13",
    },
  ],
  title: "The Bozeman Reaction",
  episodeType: "standard",
  stillPath: "/jLh4QS3YkclWPrioytdMbuVjwXL.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
