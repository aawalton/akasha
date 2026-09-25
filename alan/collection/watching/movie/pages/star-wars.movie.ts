import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const starWars = {
  id: "01a06802-6d99-7047-b6be-3831a5c72559",
  type: "page-type/movie",
  slug: "star-wars",
  title: "Star Wars",
  partOfCollections: ["fandom/star-wars-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1977-05-25",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-wars-1977",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
