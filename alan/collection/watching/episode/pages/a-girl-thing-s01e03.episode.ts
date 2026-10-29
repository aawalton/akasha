import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const aGirlThingS01e03 = {
  id: "01a18842-f6d7-7768-872b-126887014ef0",
  type: "page-type/episode",
  slug: "a-girl-thing-s01e03",
  ownLength: 59,
  ownProgress: 0,
  partOfCollections: ["season/a-girl-thing-season-1"],
  position: 3,
  publishedAt: "2001-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6619972",
      externalLink: "https://www.themoviedb.org/tv/303588/season/1/episode/3",
    },
  ],
  title: "Episode 3",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:24:12.374Z",
  updatedAt: "2026-10-29T15:24:12.374Z",
} as const satisfies Episode
