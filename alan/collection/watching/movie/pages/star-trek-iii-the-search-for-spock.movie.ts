import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const starTrekIiiTheSearchForSpock = {
  id: "01a06802-6d99-703e-803c-8a74b076b334",
  type: "page-type/movie",
  slug: "star-trek-iii-the-search-for-spock",
  title: "Star Trek III: The Search for Spock",
  partOfCollections: ["fandom/star-trek-3"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "1984-06-01",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-trek-iii-the-search-for-spock-1984",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
