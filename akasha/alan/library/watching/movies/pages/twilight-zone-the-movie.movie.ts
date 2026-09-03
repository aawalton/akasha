import type { Movie } from "../movie.page-type.ts"

export const twilightZoneTheMovie = {
  id: "01a06802-6d9a-7028-abb8-5c4b50fc7594",
  pageTypeSlug: "movie",
  slug: "twilight-zone-the-movie",
  title: "Twilight Zone: The Movie",
  partOfSlugs: ["the-twilight-zone"],
  position: 1983,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1983-06-24",
  externalId: "twilight-zone-the-movie-1983",
  externalLink: "https://trakt.tv/movies/twilight-zone-the-movie-1983",
  lastSyncedAt: "2025-10-30",
} as const satisfies Movie
