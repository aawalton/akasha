import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const doctorStrangeInTheMultiverseOfMadness = {
  id: "01a06802-6d99-7004-8120-cba325454eb5",
  type: "page-type/movie",
  slug: "doctor-strange-in-the-multiverse-of-madness",
  title: "Doctor Strange in the Multiverse of Madness",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 33,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-05-06",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/doctor-strange-in-the-multiverse-of-madness-2022",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
