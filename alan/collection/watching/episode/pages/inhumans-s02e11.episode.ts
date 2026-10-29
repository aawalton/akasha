import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const inhumansS02e11 = {
  id: "01a18849-ba10-7974-999f-76dc795f2899",
  type: "page-type/episode",
  slug: "inhumans-s02e11",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/inhumans-season-2"],
  position: 11,
  publishedAt: "2026-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7903989",
      externalLink: "https://www.themoviedb.org/tv/276288/season/2/episode/11",
    },
  ],
  title: "Episode 11",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:31:35.566Z",
  updatedAt: "2026-10-29T15:31:35.566Z",
} as const satisfies Episode
