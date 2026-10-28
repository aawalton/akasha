import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e20 = {
  id: "01a183d3-f473-7328-ac85-6ae42df429bc",
  type: "page-type/episode",
  slug: "bleach-s01e20",
  description:
    "After completing their training, Ichigo Kurosaki and his friends depart to Soul Society to rescue Rukia Kuchiki.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 20,
  publishedAt: "2005-02-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750572",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/20",
    },
  ],
  title: "Ichimaru Gin's Shadow",
  episodeType: "finale",
  stillPath: "/5Lmv2E9eK7nX3WVfutiWynQShlW.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
