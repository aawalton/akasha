import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS20e05 = {
  id: "01a18855-c2a0-7046-8995-7d0c2aeb4662",
  type: "page-type/episode",
  slug: "studio-c-s20e05",
  description: "Randy Newman. A new restaurant. A migraine medication. A used couch. Fresh steaks.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-20"],
  position: 5,
  publishedAt: "2025-03-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6352873",
      externalLink: "https://www.themoviedb.org/tv/68207/season/20/episode/5",
    },
  ],
  title: "Jake From Steak Farm",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
