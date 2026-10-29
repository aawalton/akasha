import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS19e08 = {
  id: "01a18855-c2a0-7185-9f28-7fb87fc5b0eb",
  type: "page-type/episode",
  slug: "studio-c-s19e08",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-19"],
  position: 8,
  publishedAt: "2024-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5678555",
      externalLink: "https://www.themoviedb.org/tv/68207/season/19/episode/8",
    },
  ],
  title: "Episode 8",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
