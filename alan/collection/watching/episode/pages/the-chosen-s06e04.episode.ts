import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS06e04 = {
  id: "01a18856-986c-79f4-9299-56d35734ed72",
  type: "page-type/episode",
  slug: "the-chosen-s06e04",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-6"],
  position: 4,
  publishedAt: "2026-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7108086",
      externalLink: "https://www.themoviedb.org/tv/85077/season/6/episode/4",
    },
  ],
  title: "Episode 4",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
