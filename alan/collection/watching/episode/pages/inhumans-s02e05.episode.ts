import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const inhumansS02e05 = {
  id: "01a18849-ba0f-7da1-b84c-4fc560dd330f",
  type: "page-type/episode",
  slug: "inhumans-s02e05",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/inhumans-season-2"],
  position: 5,
  publishedAt: "2026-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7903982",
      externalLink: "https://www.themoviedb.org/tv/276288/season/2/episode/5",
    },
  ],
  title: "Episode 5",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:31:35.566Z",
  updatedAt: "2026-10-29T15:31:35.566Z",
} as const satisfies Episode
