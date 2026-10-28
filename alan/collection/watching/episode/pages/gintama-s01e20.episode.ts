import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS01e20 = {
  id: "01a183d6-3260-7757-b0f4-555f1c3436f2",
  type: "page-type/episode",
  slug: "gintama-s01e20",
  description: "The Shinsengumi has been haunted by a mysterious being.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-1"],
  position: 20,
  publishedAt: "2006-08-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940294",
      externalLink: "https://www.themoviedb.org/tv/57041/season/1/episode/20",
    },
  ],
  title: "Watch Out For Conveyor Belts!",
  episodeType: "standard",
  stillPath: "/29fm5rspxprT6bXUZQlwMxNGtvO.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
