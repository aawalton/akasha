import type { Movie } from "../movie.page-type.ts"

export const werewolfByNight = {
  id: "01a06802-6d9a-702a-8707-17dc42f33ae9",
  pageTypeSlug: "movie",
  slug: "werewolf-by-night",
  title: "Werewolf by Night",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 39,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2022-10-07",
  externalLink: "https://trakt.tv/movies/werewolf-by-night-2022",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
