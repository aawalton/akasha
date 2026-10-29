import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS03e17 = {
  id: "01a18856-4000-7bd7-b5f4-316e8f51bf80",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s03e17",
  description:
    'When the guys find a ring from "The Lord of the Rings" at a garage sale, it threatens to tear them apart.',
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-3"],
  position: 17,
  publishedAt: "2010-03-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64693",
      externalLink: "https://www.themoviedb.org/tv/1418/season/3/episode/17",
    },
  ],
  title: "The Precious Fragmentation",
  episodeType: "standard",
  stillPath: "/qwBvS3JV40nWZQOBhxTMhWoSk0Q.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
