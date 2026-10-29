import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const inhumansS02e12 = {
  id: "01a18849-ba10-733a-8dad-700b9c6b8660",
  type: "page-type/episode",
  slug: "inhumans-s02e12",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/inhumans-season-2"],
  position: 12,
  publishedAt: "2026-12-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7903990",
      externalLink: "https://www.themoviedb.org/tv/276288/season/2/episode/12",
    },
  ],
  title: "Episode 12",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:31:35.566Z",
  updatedAt: "2026-10-29T15:31:35.566Z",
} as const satisfies Episode
