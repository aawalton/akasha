import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS08e11 = {
  id: "01a183d4-accc-7f17-8ee8-e5f5de57f4bb",
  type: "page-type/episode",
  slug: "my-hero-academia-s08e11",
  description:
    "How has the world changed in the eight years since Izuku and the heroes defeated All For One and Shigaraki?",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-8"],
  position: 11,
  publishedAt: "2025-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6673521",
      externalLink: "https://www.themoviedb.org/tv/65930/season/8/episode/11",
    },
  ],
  title: "My Hero Academia",
  episodeType: "finale",
  stillPath: "/2ujDRL4aVKhCASVXMawPNsYgxOD.jpg",
  voteAverage: 9.4,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
