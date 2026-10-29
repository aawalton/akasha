import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS03e07 = {
  id: "01a18859-6798-74a2-9be6-3c7a3521430b",
  type: "page-type/episode",
  slug: "upload-s03e07",
  description: "Nathan and Nora try to have a special last day together.",
  ownLength: 35,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-3"],
  position: 7,
  publishedAt: "2023-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4670017",
      externalLink: "https://www.themoviedb.org/tv/86248/season/3/episode/7",
    },
  ],
  title: "Upload Day",
  episodeType: "standard",
  stillPath: "/z0HfkW5JlpgRCSPF3BZ75GklUGj.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
