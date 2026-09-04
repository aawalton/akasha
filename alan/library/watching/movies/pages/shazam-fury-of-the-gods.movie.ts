import type { Movie } from "../movie.page-type.ts"

export const shazamFuryOfTheGods = {
  id: "01a06802-6d99-7034-ab73-068993bf1621",
  pageTypeSlug: "movie",
  slug: "shazam-fury-of-the-gods",
  title: "Shazam! Fury of the Gods",
  partOfSlugs: ["dc-extended-universe"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-03-17",
  externalLink: "https://trakt.tv/movies/shazam-fury-of-the-gods-2023",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
