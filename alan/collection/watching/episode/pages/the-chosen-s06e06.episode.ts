import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS06e06 = {
  id: "01a18856-986c-7c98-8ba6-8404bc775739",
  type: "page-type/episode",
  slug: "the-chosen-s06e06",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-6"],
  position: 6,
  publishedAt: "2026-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7108088",
      externalLink: "https://www.themoviedb.org/tv/85077/season/6/episode/6",
    },
  ],
  title: "Episode 6",
  episodeType: "finale",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
