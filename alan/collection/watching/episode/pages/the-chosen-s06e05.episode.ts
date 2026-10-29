import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS06e05 = {
  id: "01a18856-986c-7abf-8eee-03e74a84dfd5",
  type: "page-type/episode",
  slug: "the-chosen-s06e05",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-6"],
  position: 5,
  publishedAt: "2026-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7108087",
      externalLink: "https://www.themoviedb.org/tv/85077/season/6/episode/5",
    },
  ],
  title: "Episode 5",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
