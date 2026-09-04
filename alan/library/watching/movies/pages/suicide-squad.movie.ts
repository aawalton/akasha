import type { Movie } from "../movie.page-type.ts"

export const suicideSquad = {
  id: "01a06802-6d9a-7003-8870-7397f7db6e97",
  pageTypeSlug: "movie",
  slug: "suicide-squad",
  title: "Suicide Squad",
  partOfSlugs: ["dc-extended-universe"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2016-08-05",
  externalLink: "https://trakt.tv/movies/suicide-squad-2016",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
