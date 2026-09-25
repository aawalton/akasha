import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thunderbolts = {
  id: "01a06802-6d9a-7027-b64e-b240b822f2d8",
  type: "page-type/movie",
  slug: "thunderbolts",
  title: "Thunderbolts*",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 56,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-05-02",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/thunderbolts-2025",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
