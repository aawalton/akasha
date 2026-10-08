import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const captainAmericaTheFirstAvenger = {
  id: "01a06802-6d98-701e-a55f-7e816071adaf",
  type: "page-type/movie",
  slug: "captain-america-the-first-avenger",
  title: "Captain America: The First Avenger",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2011-07-22",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/captain-america-the-first-avenger-2011",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.728Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
