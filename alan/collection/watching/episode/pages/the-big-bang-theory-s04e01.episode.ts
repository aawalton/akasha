import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS04e01 = {
  id: "01a18856-4001-7810-ae5c-b94a197fdd0b",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s04e01",
  description:
    "Penny tags along on Sheldon's first ever date; Wolowitz finds a new use for a robotic arm.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-4"],
  position: 1,
  publishedAt: "2010-09-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64697",
      externalLink: "https://www.themoviedb.org/tv/1418/season/4/episode/1",
    },
  ],
  title: "The Robotic Manipulation",
  episodeType: "standard",
  stillPath: "/9Ab7pe6u7bQo55w0BArx11OQ4xI.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
