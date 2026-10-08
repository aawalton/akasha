import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const starTrekIiTheWrathOfKhan = {
  id: "01a06802-6d99-703d-9683-8531becaff54",
  type: "page-type/movie",
  slug: "star-trek-ii-the-wrath-of-khan",
  title: "Star Trek II: The Wrath of Khan",
  partOfCollections: ["fandom/star-trek-3"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "1982-06-04",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-trek-ii-the-wrath-of-khan-1982",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
