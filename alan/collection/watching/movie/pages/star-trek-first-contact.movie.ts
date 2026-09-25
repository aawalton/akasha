import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const starTrekFirstContact = {
  id: "01a06802-6d99-703b-9e2d-7805a60e7a11",
  type: "page-type/movie",
  slug: "star-trek-first-contact",
  title: "Star Trek: First Contact",
  partOfCollections: ["fandom/star-trek-3"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1996-11-22",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-trek-first-contact-1996",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
