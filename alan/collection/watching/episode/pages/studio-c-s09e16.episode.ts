import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS09e16 = {
  id: "01a18885-00ff-774a-8b69-7d6687961263",
  type: "page-type/episode",
  slug: "studio-c-s09e16",
  description:
    "In this Season 9 grand finale, Natalie tries a new face-match app, a high school class learns about taxes, and Alfred interrupts Batman during a private moment.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/studio-c-season-9"],
  position: 16,
  publishedAt: "2019-10-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1735145",
      externalLink: "https://www.themoviedb.org/tv/68207/season/9/episode/16",
    },
  ],
  title: "Season 9 Episode 16",
  episodeType: "finale",
  stillPath: "/e1lncB4MrUlAbA36IykdSPHphT9.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
