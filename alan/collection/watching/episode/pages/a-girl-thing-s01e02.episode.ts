import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const aGirlThingS01e02 = {
  id: "01a18842-f6d7-70d7-a2b6-00b7d28eb333",
  type: "page-type/episode",
  slug: "a-girl-thing-s01e02",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/a-girl-thing-season-1"],
  position: 2,
  publishedAt: "2001-01-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6619967",
      externalLink: "https://www.themoviedb.org/tv/303588/season/1/episode/2",
    },
  ],
  title: "Episode 2",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:24:12.374Z",
  updatedAt: "2026-10-29T15:24:12.374Z",
} as const satisfies Episode
