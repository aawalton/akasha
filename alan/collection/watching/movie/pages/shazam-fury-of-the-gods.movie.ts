import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const shazamFuryOfTheGods = {
  id: "01a06802-6d99-7034-ab73-068993bf1621",
  type: "page-type/movie",
  slug: "shazam-fury-of-the-gods",
  title: "Shazam! Fury of the Gods",
  partOfCollections: ["fandom/dc-extended-universe"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-03-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/shazam-fury-of-the-gods-2023",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
