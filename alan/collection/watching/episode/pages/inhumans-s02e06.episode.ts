import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const inhumansS02e06 = {
  id: "01a18849-ba0f-7106-91fa-be4f66a06134",
  type: "page-type/episode",
  slug: "inhumans-s02e06",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/inhumans-season-2"],
  position: 6,
  publishedAt: "2026-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7903983",
      externalLink: "https://www.themoviedb.org/tv/276288/season/2/episode/6",
    },
  ],
  title: "Episode 6",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:31:35.566Z",
  updatedAt: "2026-10-29T15:31:35.566Z",
} as const satisfies Episode
