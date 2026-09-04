import type { Movie } from "../movie.page-type.ts"

export const starTrekViTheUndiscoveredCountry = {
  id: "01a06802-6d99-7046-b502-49ed685dc5b2",
  pageTypeSlug: "movie",
  slug: "star-trek-vi-the-undiscovered-country",
  title: "Star Trek VI: The Undiscovered Country",
  partOfSlugs: ["star-trek-3"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1991-12-06",
  externalLink: "https://trakt.tv/movies/star-trek-vi-the-undiscovered-country-1991",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
