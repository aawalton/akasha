import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS02e28 = {
  id: "01a183d3-f484-707e-89ea-2c3fc429afa6",
  type: "page-type/episode",
  slug: "bleach-s02e28",
  description: "Ichigo and his friends hurry to the Reio Greater Palace to stop Yhwach.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-2"],
  position: 28,
  publishedAt: "2024-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5649783",
      externalLink: "https://www.themoviedb.org/tv/30984/season/2/episode/28",
    },
  ],
  title: "KILL THE KING",
  episodeType: "standard",
  stillPath: "/fnvS6ZZArA8f43mdCUjKB2Y6I8B.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
