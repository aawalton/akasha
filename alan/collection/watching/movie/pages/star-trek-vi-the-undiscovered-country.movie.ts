import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const starTrekViTheUndiscoveredCountry = {
  id: "01a06802-6d99-7046-b502-49ed685dc5b2",
  type: "page-type/movie",
  slug: "star-trek-vi-the-undiscovered-country",
  title: "Star Trek VI: The Undiscovered Country",
  partOfCollections: ["fandom/star-trek-3"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1991-12-06",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-trek-vi-the-undiscovered-country-1991",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
