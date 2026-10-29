import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS06e03 = {
  id: "01a18856-986b-7e70-a676-1bf6a4e88550",
  type: "page-type/episode",
  slug: "the-chosen-s06e03",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-6"],
  position: 3,
  publishedAt: "2026-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7108084",
      externalLink: "https://www.themoviedb.org/tv/85077/season/6/episode/3",
    },
  ],
  title: "Episode 3",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
