import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const deptQS02e01 = {
  id: "01a18845-f1d0-7395-a853-dd3430e3979c",
  type: "page-type/episode",
  slug: "dept-q-s02e01",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/dept-q-season-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7777733",
      externalLink: "https://www.themoviedb.org/tv/245703/season/2/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:27:27.695Z",
  updatedAt: "2026-10-29T15:27:27.695Z",
} as const satisfies Episode
