import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS06e01 = {
  id: "01a18856-986b-72b1-a879-b4307e403e35",
  type: "page-type/episode",
  slug: "the-chosen-s06e01",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-6"],
  position: 1,
  publishedAt: "2026-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7108081",
      externalLink: "https://www.themoviedb.org/tv/85077/season/6/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
