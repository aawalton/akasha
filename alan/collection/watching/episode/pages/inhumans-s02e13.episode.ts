import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const inhumansS02e13 = {
  id: "01a18849-ba10-70ef-8b2b-330e7621ec64",
  type: "page-type/episode",
  slug: "inhumans-s02e13",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/inhumans-season-2"],
  position: 13,
  publishedAt: "2026-12-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7903991",
      externalLink: "https://www.themoviedb.org/tv/276288/season/2/episode/13",
    },
  ],
  title: "Episode 13",
  episodeType: "finale",
  voteAverage: 0,
  createdAt: "2026-10-29T15:31:35.566Z",
  updatedAt: "2026-10-29T15:31:35.566Z",
} as const satisfies Episode
