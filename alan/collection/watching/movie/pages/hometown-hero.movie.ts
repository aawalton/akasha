import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hometownHero = {
  id: "01a1749a-06bc-793f-ac96-bb353db9b37f",
  type: "page-type/movie",
  slug: "hometown-hero",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-09-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "975428",
      externalLink: "https://www.themoviedb.org/movie/975428",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hometown Hero",
  voteAverage: 0,
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
