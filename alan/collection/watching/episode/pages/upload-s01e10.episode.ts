import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS01e10 = {
  id: "01a18859-6798-7299-b9a4-450d4d4cbb8a",
  type: "page-type/episode",
  slug: "upload-s01e10",
  description:
    "Nathan’s restored memories and shifting emotional allegiances put Nora in physical danger.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-1"],
  position: 10,
  publishedAt: "2020-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2249651",
      externalLink: "https://www.themoviedb.org/tv/86248/season/1/episode/10",
    },
  ],
  title: "Freeyond",
  episodeType: "finale",
  stillPath: "/dqjEMEO8JqMcMZZeOhJRl7yXlJA.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
