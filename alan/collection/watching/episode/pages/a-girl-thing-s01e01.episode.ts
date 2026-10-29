import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const aGirlThingS01e01 = {
  id: "01a18842-f6d7-798e-9b11-9f901509caf2",
  type: "page-type/episode",
  slug: "a-girl-thing-s01e01",
  description: "Episode 1 of the miniseries.",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/a-girl-thing-season-1"],
  position: 1,
  publishedAt: "2001-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6619951",
      externalLink: "https://www.themoviedb.org/tv/303588/season/1/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:24:12.374Z",
  updatedAt: "2026-10-29T15:24:12.374Z",
} as const satisfies Episode
