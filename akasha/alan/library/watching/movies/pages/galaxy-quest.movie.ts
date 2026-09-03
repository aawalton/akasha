import type { Movie } from "../movie.page-type.ts"

export const galaxyQuest = {
  id: "01a06802-6d99-7010-b9dc-96d3aaedc854",
  pageTypeSlug: "movie",
  slug: "galaxy-quest",
  title: "Galaxy Quest",
  partOfSlugs: ["science-fiction-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1999-12-25",
  externalLink: "https://trakt.tv/movies/galaxy-quest-1999",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
