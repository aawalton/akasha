import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS02e06 = {
  id: "01a18859-6798-7396-951c-79f3271055a2",
  type: "page-type/episode",
  slug: "upload-s02e06",
  description:
    "Nora and Aleesha pursue the mystery into New York City with Nathan and Luke along on screens. Ingrid receives unexpected visitors.",
  ownLength: 27,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-2"],
  position: 6,
  publishedAt: "2022-03-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3505482",
      externalLink: "https://www.themoviedb.org/tv/86248/season/2/episode/6",
    },
  ],
  title: "The Outing",
  episodeType: "standard",
  stillPath: "/4IZTcGZTwyXtdMwyq2CdsDhywQg.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
