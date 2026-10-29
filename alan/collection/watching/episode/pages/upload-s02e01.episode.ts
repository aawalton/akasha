import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS02e01 = {
  id: "01a18859-6798-722c-ac7f-e690fe6f76e1",
  type: "page-type/episode",
  slug: "upload-s02e01",
  description: "While living with Ingrid, Nathan searches for Nora, who has fled off the grid.",
  ownLength: 32,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-2"],
  position: 1,
  publishedAt: "2022-03-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3459038",
      externalLink: "https://www.themoviedb.org/tv/86248/season/2/episode/1",
    },
  ],
  title: "Welcome Back, Mr. Brown",
  episodeType: "standard",
  stillPath: "/mmOeU9qcXAIYRDn7OKkJRzSHo5Y.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
