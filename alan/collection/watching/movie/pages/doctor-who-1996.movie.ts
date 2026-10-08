import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const doctorWho1996 = {
  id: "01a06802-6d99-7005-a920-b1bff45a1eeb",
  type: "page-type/movie",
  slug: "doctor-who-1996",
  title: "Doctor Who (1996)",
  partOfCollections: ["fandom/doctor-who"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1996-05-14",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/doctor-who-1996",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
